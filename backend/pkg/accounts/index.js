const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
  email: String,
  password: String,
  fullname: String,
});

const Account = mongoose.model("account", accountSchema, "accounts");

const create = async (acc) => {
  const account = new Account(acc);
  return account.save();
};

const getById = async (id) => {
  return await Account.findOne({ _id: id });
};

const getByEmail = async (email) => {
  return await Account.findOne({ email });
};

const getAll = async () => {
  return await Account.find({});
};

const update = async (id, newData) => {
  return await Account.updateOne({ _id: id }, newData);
};

const remove = async (id) => {
  return await Account.deleteOne({ _id: id });
};

module.exports = {
  create,
  getById,
  getByEmail,
  getAll,
  update,
  remove
};