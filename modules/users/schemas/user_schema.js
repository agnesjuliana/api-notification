const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: false,
  },
  username: {
    type: String,
    unique: true,
    index: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    default: null,
  },

  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
