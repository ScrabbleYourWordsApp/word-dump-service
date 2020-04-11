const express = require("express");

const app = express();
const port = process.env.PORT || "8080";

app.get("/", (req, res) => {
    res.status(200).send("Word Dump Service is up and running!");
    });
