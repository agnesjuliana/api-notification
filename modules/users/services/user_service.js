const wrapper = require("../../../helpers/utils/wrapper");
const query = require("../repositories/query");
const command = require("../repositories/command");
const logger = require("../../../helpers/utils/logger");
const { SUCCESS, ERROR } = require("../../../helpers/http-status/status_code");
const { verify, encrypt} = require("../utils/cryptography");
const jwtAuth = require("../../../infra/auth/jwt_auth_helper");
const jwtAuthAdmin = require("../../../infra/auth/admin_jwt_auth_helper");
const config = require("../../../infra/config/global_config");
const { checkValidUsernamePass } = require("../utils/validation");

class User {
    constructor() {
        this.ctx = 'User';
    }

    async login(payload) {
        const ctx = `${this.ctx}.login`;

        const { username, password } = payload;

        const user = await query.findOneUser({ username } || { email: username });
        if (user.err) {
            logger.log(`${ctx}.query.findOneUser`, 'User Not Found', ERROR.NOT_FOUND);
            return wrapper.error('error', 'Invalid username or password', ERROR.NOT_FOUND);
        };

        if (user.isVerified === false) {
            this.resendMail({ email: user.email, username: user.username });
            return wrapper.error('error', 'Unverified User', ERROR.FORBIDDEN);
        };

        if (!user.password) {
            return wrapper.error('error', 'Register with oauth', ERROR.FORBIDDEN);
        };

        const verifyPassword = await verify(password, user.password);
        if (verifyPassword.err) {
            logger.log(`${ctx}.verifyPassword`, 'Incorrect password', ERROR.NOT_FOUND);
            return wrapper.error('error', 'Incorrect password', ERROR.NOT_FOUND);
        };

        const payloadToken = {
            id: user._id,
            email: user.email,
            name: user.name,
            username: user.username,
            role: "user"
        };
        const token = await jwtAuth.generateToken(payloadToken);

        const result = {
            name: user.name,
            username: user.username,
            token: token
        };

        return wrapper.data(result, 'Login success', SUCCESS.OK);
    };

    async loginAdmin(payload) {
        const ctx = `${this.ctx}.login`;

        const userDatas = config.get('/superadmin');
        const user = await checkValidUsernamePass(payload, userDatas);
        if (user == '') {
            logger.log(`${ctx}.query.findOneUser`, 'User Not Found', ERROR.NOT_FOUND);
            return wrapper.error('error', 'Invalid username or password', ERROR.NOT_FOUND);
        };

        const payloadToken = {
            id: 1,
            email: "admin@mail.com",
            name: "adminsuper",
            username: user.username,
            role: "superadmin"
        };
        const token = await jwtAuthAdmin.generateToken(payloadToken);

        const result = {
            name: "superadmin",
            username: user.username,
            token: token
        };

        return wrapper.data(result, 'Login admin success', SUCCESS.OK);
    };

    async register(payload) {
        const ctx = `${this.ctx}.register`;

        const { name, username, email, password } = payload;
        const userAlreadyExist = await query.findOneUser({ username });
        if (!userAlreadyExist.err) {
            logger.log(`${ctx}.query.findOneUser`, 'User already exist', ERROR.CONFLICT);
            return wrapper.error('error', 'User already exist', ERROR.CONFLICT);
        }

        const emailAlreadyExist = await query.findOneUser({ email })
        if (!emailAlreadyExist.err) {
            logger.log(`${ctx}.query.findOneUser`, 'User already exist', ERROR.CONFLICT);
            return wrapper.error('error', 'Email already exist', ERROR.CONFLICT);
        }

        const hashPassword = await encrypt(password, process.env.IV_PASS, process.env.KEY_PASS);
        if (hashPassword.err) {
            logger.log(`${ctx}.hashPassword`, hashPassword.message, ERROR.INTERNAL_ERROR);
            return wrapper.error('error', 'Error detected while creating password', ERROR.INTERNAL_ERROR);
        };

        const customPayload = { name, username, email, password: hashPassword.data};
        const result = await command.insertOneUser(customPayload);
        if (result.err) {
            logger.log(`${ctx}.command.insertOneUser`, result.message, ERROR.INTERNAL_ERROR);
            return wrapper.error('error', 'Error detected while creating user', ERROR.INTERNAL_ERROR);
        };

        return wrapper.data(result.data, 'Success to create user', SUCCESS.CREATED);
    };
}

module.exports = User