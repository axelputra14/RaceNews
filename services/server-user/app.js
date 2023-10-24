const cors = require("cors");
const express = require("express");
const { mongoConnect } = require("./config/mongoConnection");
const router = require("./routers/user");
const app = express();

const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/users", router);

(async () => {
  try {
    await mongoConnect();
    app.listen(port, () => console.log(`Around ${port} tours to go`));
  } catch (err) {
    console.log(`Failed to connect to mongodb`);
  }
})();
