const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("../../../pkg/config");
const Account = require("../../../pkg/accounts");
const { AccountRegister, AccountLogin, validate} = require("../../../pkg/accounts/validate");

const register = async (req, res) => {
  try {
    await validate(req.body, AccountRegister);
    const exists = await Account.getByEmail(req.body.email);
    if (exists) {
      return res.status(400).send("Account with this email already exists!");
    }
    req.body.password = bcrypt.hashSync(req.body.password);
    const acc = await Account.create(req.body);
    return res.status(201).send(acc);
  } catch (err) {
    return res.status(err.status).send(err.error);
  }
};

const login = async (req, res) => {
  try {
    await validate(req.body, AccountLogin);
    const { email, password } = req.body;
    const account = await Account.getByEmail(email);
    if (!account) {
      return res.status(400).send("Account not found!");
    }
    if (!bcrypt.compareSync(password, account.password)) {
      return res.status(400).send("Incorrect password!");
    }
    const payload = {
      fullname: account.fullname,
      email: account.email,
      id: account._id,
      exp: new Date().getTime() / 1000 + 7 * 24 * 60 * 60,
    };
    const token = jwt.sign(payload, config.getSection("security").jwt_secret);
    return res.status(200).send(token);
  } catch (err) {
    return res.status(err.status).send(err.error);
  }
};

const refreshToken = async (req, res) => {
  const payload = {
    ...req.auth,
    exp: new Date().getTime() / 1000 + 7 * 24 * 60 * 60
  };
  const token = jwt.sign(payload, config.getSection("security").jwt_secret);
  return res.status(200).send(token);
};

module.exports = {
  login,
  register,
  refreshToken
};