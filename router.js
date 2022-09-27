const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UsersModel = require("./models/users");

const router = express.Router();

router.get("/testDB", testDB);
router.post("/signup", signUp);

function signUp(req, res) {
  let newUser = { ...req.body };
  UsersModel.find().then((user) => {
    if (
      user.find((e) => {
        return e.email == newUser.email;
      }) !== undefined
    ) {
      console.log("accountAlreadyExist");
      return res.status(400).send({
        type: "accountAlreadyExist",
        message: "Ce compte existe déjà.",
      });
    }
    bcrypt
      .hash(newUser.password, 10)
      .then((passwordHashed) => {
        newUser.password = passwordHashed;
        return newUser;
      })
      .then((newUser) => {
        UsersModel.create(newUser);
        console.log(`donnée ajouté ${newUser.email}`);
        res.status(200).send("Donnée envoyée avec succèes.");
      });
  });
}

function testDB(req, res) {
  UsersModel.find().then((data) => {
    console.log(data);
    res.send(`Voici les données ${data}`);
  });
}

module.exports = router;
