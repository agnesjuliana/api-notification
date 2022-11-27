const validator = require("../../../helpers/utils/validator");
const schema = require("../validators/user_validator");
const User = require("../services/user_service");
const wrapper = require("../../../helpers/utils/wrapper");

const register = async (req, res) => {
    const user = new User()
    const payload = req.body;
    const validatePayload = validator.isValid(payload, schema.register);

    const createData = async (result) => {
        if (result.err) {
            return result;
        };
        
        return await user.register(payload)
    };

    const sendResponse = async (result) => {
        (result.err) ? wrapper.response(res, 'fail', result)
            : wrapper.response(res, 'success', result);
    };

    sendResponse(await createData(validatePayload));
};

const login = async (req, res) => {
    const user = new User()
    const payload = req.body;
    const validatePayload = validator.isValid(payload, schema.login);

    const sendData = async (result) => {
        if (result.err) return result;
        return user.login(result.data);
    };

    const sendResponse = async (result) => {
        (result.err) ? wrapper.response(res, 'fail', result)
            : wrapper.response(res, 'success', result);
    };

    sendResponse(await sendData(validatePayload));
};

const loginAdmin = async (req, res) => {
    const user = new User()
    const payload = req.body;
    const validatePayload = validator.isValid(payload, schema.login);

    const sendData = async (result) => {
        if (result.err) return result;
        return user.loginAdmin(result.data);
    };

    const sendResponse = async (result) => {
        (result.err) ? wrapper.response(res, 'fail', result)
            : wrapper.response(res, 'success', result);
    };

    sendResponse(await sendData(validatePayload));
};

module.exports = {register, login, loginAdmin}