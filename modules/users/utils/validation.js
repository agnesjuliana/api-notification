const userQuery = require("../repositories/query");

const checkValidUserByID = async (payload) => {
    // Check Valid User as Parallel
    const users = await Promise.all(payload.map(async (data) => {
        const user = await userQuery.findOneUser({ _id: data._id });
        if (!user.err) {
            return {
                _id: user.id,
                username: user.username,
                email: user.email,
                privilege: data.privilege
            };
        };
    }));
    return users.filter(data => data);
};

const checkValidUserByEmail = async (payload) => {
    const users = await Promise.all(payload.map(async (data) => {
        const user = await userQuery.findOneUser({ email: data.email });
        if (!user.err) {
            return {
                _id: user.id,
                username: user.username,
                email: user.email,
                privilege: data.privilege
            };
        };
    }));
    return users.filter(data => data);
};

const checkValidUsernamePass = async (payload, userDatas) => {
    let user = userDatas.map((value) => {
        if (value.username === payload.username && value.password === payload.password) {
            return value;
        }
        return '';
    });
    return user;
};

module.exports = { checkValidUserByID, checkValidUserByEmail, checkValidUsernamePass };