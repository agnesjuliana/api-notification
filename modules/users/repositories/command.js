const User = require("../schemas/user_schema");
const wrapper = require("../../../helpers/utils/wrapper");

const insertOneUser = async (document) => {
  try {
    const db = new User(document);
    return await db.save();
  } catch (error) {
    return wrapper.error("error", error.message, 500);
  }
};

const updateUser = async (param, document) => {
  try {
    return await User.updateOne(param, document);
  } catch (error) {
    return wrapper.error("error", error.message, 500);
  }
};

module.exports = { insertOneUser, updateUser};
