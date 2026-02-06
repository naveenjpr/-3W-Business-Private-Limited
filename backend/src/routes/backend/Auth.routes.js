const express = require("express");
const route = express.Router();
const AuthController = require("../../controllers/backend/Auth.controller");

module.exports = (app) => {
  route.post("/register", AuthController.register);

  route.post("/login", AuthController.login);

  app.use("/api/backend/auth", route);
};
//localhost:5000/api/backend/auth/register
//localhost:5000/api/backend/auth/login
