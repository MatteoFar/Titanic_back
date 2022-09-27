const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  // _id: { type: mongoose.Schema.Types.ObjectId },
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String },
  password: { type: String },
});

module.exports = mongoose.model("users", usersSchema, "titanic.users");
