const express = require("express");
const config = require("../../pkg/config");
const db = require("../../pkg/db");
const jwt = require("express-jwt");
const posts = require("./handlers/posts");

db.init();

const app = express();
app.use(express.json());

app.use(
  jwt.expressjwt({
    algorithms: ["HS256"],
    secret: config.getSection("security").jwt_secret
  })
);

app.get("/api/v1/posts", posts.getAll);
app.get("/api/v1/posts/:id", posts.getSingle);
app.post("/api/v1/posts", posts.create);
app.put("/api/v1/posts/:id", posts.update);
app.delete("/api/v1/posts/:id", posts.remove);

app.listen(config.getSection("services").posts.port, (err) => {
  err
  ? console.log(err)
  : console.log(`Service [posts] successfully started on port ${config.getSection("services").posts.port}`);
});