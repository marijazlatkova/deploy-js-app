const Post = require("../../../pkg/posts");
const { BlogPOST, BlogPUT, validate } = require("../../../pkg/posts/validate");

const getAll = async (req, res) => {
  try {
    const data = await Post.getAll(req.auth.id);
    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const getSingle = async (req, res) => {
  try {
    const data = await Post.getSingle(req.auth.id, req.params.id);
    if (!data) {
      return res.status(404).send("Post not found!");
    }
    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const create = async (req, res) => {
  try {
    await validate(req.body, BlogPOST);
    if (!req.auth.id) {
      return res.status(400).send("Unauthorized action!");
    }
    const data = {
      ...req.body,
      account_id: req.auth.id,
    };
    const newPost = await Post.create(data);
    return res.status(200).send(newPost);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const update = async (req, res) => {
  try {
    await validate(req.body, BlogPUT);
    if (!req.auth.id) {
      return res.status(400).send("Unauthorized action!");
    }
    const data = {
      ...req.body,
      account_id: req.auth.id,
    };
    await Post.update(req.params.id, data);
    return res.status(204).send("Post updated successfully");
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const remove = async (req, res) => {
  try {
    await Post.remove(req.params.id);
    return res.status(200).send("Post deleted successfully");
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAll,
  getSingle,
  create,
  update,
  remove
};