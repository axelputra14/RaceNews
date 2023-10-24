//const express = require("express");
const router = require("express").Router();
const postRouter = require("./postRouter");
const categoryRouter = require("./categoryRouter");
const tagRouter = require("./tagRouter");

// ROUTES
router.use("/post", postRouter);
router.use("/category", categoryRouter);
router.use("/tag", tagRouter);
// authentication customer nanti

module.exports = router;
