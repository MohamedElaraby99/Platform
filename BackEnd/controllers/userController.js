const User = require("../models/User");

const getAllUsers = async (req, res) => {
  // const users = await User.find().select("-password").lean();
  const users = await User.find();

  if (users.length === 0) {
    return res.status(400).json({ message: "there's no users" });
  }
  res.json(users);
};

module.exports = {
  getAllUsers,
};
