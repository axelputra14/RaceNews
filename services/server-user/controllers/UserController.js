const User = require("../models/user");

module.exports = {
  findAllUsers: async (req, res, next) => {
    const data = await User.findAll();

    res.status(200).json({
      statusCode: 200,
      data,
    });
  }, // done test
  createUser: async (req, res, next) => {
    const { email, username } = req.body;

    //model way
    const newUser = await User.createUser({
      email,
      username,
      role: "Admin",
    });

    res.status(201).json({
      statusCode: 201,
      id: newUser.insertedId,
      email,
      username,
    });
  },
  findUserById: async (req, res, next) => {
    const { id } = req.params;
    // console.log(id, "di controller");

    const foundUser = await User.findById(id);

    res.status(200).json({
      statusCode: 200,
      data: foundUser,
    });
  }, // done test
  deleteUser: async (req, res, next) => {
    const { id } = req.params;

    const foundUser = await User.findById(id);

    await User.deleteUser(id);

    res.status(200).json({
      statusCode: 200,
    });
  },
};
