const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tagController");

router.get("/", tagController.fetchTag);
router.post("/", tagController.addTag);
router.put("/", tagController.updateTag);
router.delete("/", tagController.deleteTag);

module.exports = router;
