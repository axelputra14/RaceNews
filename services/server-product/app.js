require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const router = require("./routers/router"); // router
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true })); // body parser
app.use(express.json());

app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`${port} teraflops of computing power`);
});

module.exports = app;
