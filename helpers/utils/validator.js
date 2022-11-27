const validate = require("validate.js");
const wrapper = require("./wrapper");

const isValid = (payload, constraint) => {
  const { value, error } = constraint.validate(payload);
  if (!validate.isEmpty(error)) {
    return wrapper.error("fail", error, 400);
  }
  return wrapper.data(value, "success", 200);
};

module.exports = {
  isValid
};
