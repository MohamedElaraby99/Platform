const User = require("../models/User");

const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password").lean();

  if (users.length === 0) {
    return res.status(400).json({ message: "لا يوجد مستخدمين" });
  }
  res.json(users);
};

module.exports = {
  getAllUsers,
};
