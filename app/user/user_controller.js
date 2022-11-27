const httpHandler = require("../../modules/users/handlers/user_handler");
const jwtAuth = require('../../infra/auth/jwt_auth_helper');
const jwtAuthAdmin = require('../../infra/auth/admin_jwt_auth_helper');


const routes = async (server) => {
    server.post("/v1/users/register", httpHandler.register);
    server.post("/v1/users/login", httpHandler.login);

    // for admin
    server.post("/admin/v1/users/login", httpHandler.loginAdmin);

};

module.exports = { routes };