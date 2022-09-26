const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UsersModel = require("./models/users");

const router = express.Router();

router.get("/testDB", testDB);
router.post("signup", signUp);

function signUp(req, res) {}

function testDB(req, res) {
  UsersModel.find().then((data) => {
    console.log(data);
    res.send(`Voici les données ${data}`);
  });
}

module.exports = router;
