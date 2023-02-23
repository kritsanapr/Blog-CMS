const express = require("express");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const router = express.Router();
const {
  create,
  update,
  getAll,
  getOne,
  remove,
} = require("../controllers/post.controller");
// Post article
// Get post article
// Get one post article
// Update post article
// Delete post article

router.post("/post", uploadMiddleware.single("image"), create);
router.put("/post", uploadMiddleware.single("image"), update);
router.get("/post", getAll);
router.get("/post/:id", getOne);
router.delete("/post/:id", remove);

module.exports = router;
