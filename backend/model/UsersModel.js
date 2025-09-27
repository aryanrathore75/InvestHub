const { model } = require("mongoose");

const { UsersSchema } = require("../schemas/UsersSchema");

const UsersModel = new model("User", UsersSchema);

module.exports = { UsersModel };
