const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.fetchCategory);
router.post("/", categoryController.addCategory);
router.put("/", categoryController.updateCategory);
router.delete("/", categoryController.deleteCategory);

module.exports = router;
