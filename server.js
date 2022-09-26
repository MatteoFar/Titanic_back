require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

const port = process.env.APP_PORT;

app.use(cors());
app.use(express.json()); // équivalent à body-parser

app.use("/", require("./router"));

mongoose.connect(`${process.env.DB_HOST}${process.env.DB_NAME}`).then(() => {
  console.log("connexion avec la base de donnée établie");
  app.listen(port, () => console.log(`Serveur lancé sur le port : ${port}`));
});
