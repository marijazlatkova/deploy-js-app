const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const fileUpload = require("express-fileupload");
const config = require("../../pkg/config");
const storage = require("./handlers/storage");

const app = express();
app.use(fileUpload());

app.use(
  jwt({
    algorithms: ["HS256"],
    secret: config.getSection("security").jwt_secret
  })
);

app.post("/api/v1/storage", storage.upload);
app.get("/api/v1/storage/:file", storage.download);

app.listen(config.getSection("services").storage.port, (err) => {
  err 
  ? console.log(err)
  : console.log(`Service [storage] successfully started at port ${config.getSection("services").storage.port}`);
});