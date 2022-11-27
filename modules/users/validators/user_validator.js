
const joi = require('joi');

const register = joi.object({
    username: joi.string().required().regex(/^[a-zA-Z0-9-_]+$/).message("Only contain letters (a-z), numbers (1-9), dashes ( - ), and underscores ( _ )"),
    password: joi.string().required(),
    name: joi.string().required(),
    email: joi.string().email().required(),
});

const login = joi.object({
    username: joi.string().required(),
    password: joi.string().required(),
});

module.exports = {register, login}