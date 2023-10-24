const express = require("express");
const router = express.Router();

const {
  findAllUsers,
  createUser,
  findUserById,
  deleteUser,
} = require("../controllers/UserController");

router.get("/", findAllUsers);
router.get("/:id", findUserById);
router.post("/", createUser);
router.delete("/:id", deleteUser);

module.exports = router;
