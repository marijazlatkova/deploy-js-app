const mongoose = require("mongoose");
const config = require("../config");

const init = async () => {
  const username = config.getSection("db").username;
  const password = config.getSection("db").password;
  const dbname = config.getSection("db").dbname;
  const dsn = `mongodb+srv://${username}:${password}@cluster0.tonpgxf.mongodb.net/${dbname}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(dsn);
    console.log("Successfully connected to the database");
  } catch (err) {
    console.error("Error connecting to the database", err);
  }
};

module.exports = {
  init
};