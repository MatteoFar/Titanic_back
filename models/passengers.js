const mongoose = require("mongoose");

const passengersSchema = new mongoose.Schema({
  // _id: { type: mongoose.Schema.Types.ObjectId },
  PassengerId: { type: Number },
  Survived: { type: Number },
  Pclass: { type: Number },
  Name: { type: String },
  Sex: { type: String },
  Age: { type: Number },
  SibSp: { type: Number },
  Parch: { type: Number },
  Ticket: { type: Number },
  Fare: { type: Number },
  Cabin: { type: String },
  Embarked: { type: String },
});

module.exports = mongoose.model("passengers", passengersSchema, "passengers");
