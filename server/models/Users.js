const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
    },
    isDeleted: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("Users", userSchema);
module.exports = UserModel;
