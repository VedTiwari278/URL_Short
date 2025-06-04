// Router/Routes.js
const express = require("express");
const Controller = require("../Controller/Controller");
const Router = express.Router();

Router.get("/", Controller.Home);
Router.get("/:shortCode", Controller.getData);
Router.post("/url-shortn", Controller.PostData);

module.exports = Router;
