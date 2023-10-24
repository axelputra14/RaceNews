const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.get("/", postController.fetchPost);
router.post("/", postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
router.get("/:id", postController.fetchPostById); // later after client side is underway

module.exports = router;
