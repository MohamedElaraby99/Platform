const User = require("../models/User");
const bcrypt = require("bcrypt");
const jsonWebToken = require("jsonwebtoken");
const register = async (req, res) => {
  const { name, username, password, role, stage } = req.body;
  if (!name || !username || !password || !role) {
    return res.status(400).json({ message: "كل الحقول مطلوبة" });
  }
  if (role !== "admin") {
    if (!stage) {
      return res
        .status(400)
        .json({ message: "المرحلة الدراسية مطلوبة اذا لم تكن مشرف" });
    }
  }

  const foundUser = await User.findOne({ username }).exec();
  if (foundUser) {
    return res.status(401).json({ message: "المستخدم موجود بالفعل" });
  }

  // const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    username,
    stage,
    password,
    role,
  });

  const accessToken = jsonWebToken.sign(
    {
      userInfo: {
        id: user._id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  const refreshToken = jsonWebToken.sign(
    {
      userInfo: {
        id: user._id,
      },
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("jwt", refreshToken, {
    httpOnly: true, // accessible only by web server
    secure: true, // https
    sameSite: "None", // cross-site cookie
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  res.json({
    accessToken,
    username: user.username,
    stage: user.stage,
    role: user.role,
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "كل الحقول مطلوبة" });
  }

  const foundUser = await User.findOne({ username }).exec();

  if (!foundUser) {
    return res.status(401).json({ message: "المستخدم غير موجود" });
  }

  // const isMatch = await bcrypt.compare(password, foundUser.password);
    const foundPassword = await User.findOne({ password }).exec();


  if (!foundPassword) {
    return res.status(401).json({ message: "كلمة المرور خاطئة" });
  }
  const accessToken = jsonWebToken.sign(
    {
      userInfo: {
        id: foundUser._id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  const refreshToken = jsonWebToken.sign(
    {
      userInfo: {
        id: foundUser._id,
      },
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    accessToken,
    username: foundUser.username,
    role: foundUser.role,
    stage: foundUser.stage,
  });
};

module.exports = {
  register,
  login,
};
