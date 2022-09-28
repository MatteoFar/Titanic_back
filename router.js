const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UsersModel = require("./models/users");

const router = express.Router();

router.get("/testDB", testDB);
router.post("/signup", addUser);
router.post("/signin", login);

function addUser(req, res) {
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

function login(req, res) {
  try {
    let userLogin = { ...req.body };
    UsersModel.findOne({ email: userLogin.email }).then((user) => {
      if (!user) {
        console.log("account Not found !");
        return res
          .status(404)
          .send({ type: "login", message: "Compte introuvable" });
      }
      console.log("account found !");
      bcrypt.compare(userLogin.password, user.password).then((isValid) => {
        console.log(isValid);
        if (isValid) {
          const token = jwt.sign(
            {
              firstname: user.firstname,
              lastname: user.lastname,
            },
            process.env.SECRET_API_TOKEN
          );
          return res.status(200).send({
            type: "success",
            message: "Connexion Validée.",
            token: token,
            user: user,
          });
        } else {
          return res.status(403).send("mot de passe incorrect");
        }
      });

      // res.status(200).send("Compte trouvé ! Demande de connexion reçu.");
    });
  } catch (error) {
    res
      .status(500)
      .send({ type: "server", message: `Erreur serveur ${error}` });
  }
}

function testDB(req, res) {
  UsersModel.find().then((data) => {
    console.log(data);
    res.send(`Voici les données ${data}`);
  });
}

module.exports = router;
