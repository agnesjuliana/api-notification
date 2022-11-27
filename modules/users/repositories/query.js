const User = require("../schemas/user_schema");
const wrapper = require("../../../helpers/utils/wrapper");
const { ERROR } = require("../../../helpers/http-status/status_code");

const findOneUser = async (parameter) => {
    try {
        const result = await User.findOne(parameter).exec();
        if (!result) {
            return wrapper.error('error', `User not found`, ERROR.NOT_FOUND);
        }
        return result;
    } catch (error) {
        return wrapper.error('error', error.message, ERROR.INTERNAL_ERROR);    
    }
};

const findAllUser = async () => {
    try {
        const result = await User.find().exec();
        if (result.length < 1) {
            return wrapper.error('error', "User not found", ERROR.NOT_FOUND);
        }
        return result;
    } catch (error) {
        return wrapper.error('error', error.message, ERROR.INTERNAL_ERROR);
    }
}

module.exports = {findOneUser, findAllUser}