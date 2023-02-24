const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Post = require("../models/Post.model");
const jwt = require("jsonwebtoken");

const create = async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(postDoc);
  });
};

const update = async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json("you are not the author");
    }
    await postDoc.update({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });

    res.json(postDoc);
  });
};

const getAll = async (req, res) => {
  try {
    const postDoc = await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json(postDoc);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  try {
    const postDoc = await Post.findById(id).populate("author", ["username"]);

    res.status(200).json(postDoc);
  } catch (err) {
    res.status(500).json(err);
  }
};

const remove = async (req, res) => {};

module.exports = {
  create,
  update,
  getAll,
  getOne,
  remove,
};
