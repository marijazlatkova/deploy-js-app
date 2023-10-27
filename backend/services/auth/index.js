const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const config = require("../../pkg/config");
const auth = require("./handlers/auth");
const db = require("../../pkg/db");

db.init();

const app = express();
app.use(express.json());

app.use(
  jwt({
    secret: config.getSection("security").jwt_secret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      "/api/v1/auth/login",
      "/api/v1/auth/register",
      "/api/v1/auth/refreshToken"
    ],
  })
);

app.post("/api/v1/auth/login", auth.login);
app.post("/api/v1/auth/register", auth.register);
app.post("/api/v1/refreshToken", auth.refreshToken);

app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedAction") {
    res.status(401).send("Invalid token...");
  }
  next(err);
});

app.listen(config.getSection("services").auth.port, (err) => {
  err 
  ? console.log(err)
  : console.log(`Service [auth] successfully started at port ${config.getSection("services").auth.port}`);
});