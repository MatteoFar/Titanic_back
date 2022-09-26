require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

const port = process.env.APP_PORT;

app.listen(port, () => console.log(`Serveur lancé sur le port : ${port}`));
