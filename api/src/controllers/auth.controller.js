const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log({ username, password });
    const userDoc = await User.findOne({ username });

    if (!userDoc) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = bcrypt.compareSync(password, userDoc.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log(userDoc);
    console.log(isPasswordValid);

    const token = jwt.sign(
      {
        username: userDoc.username,
        id: userDoc._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", token).status(200).json({
      message: "Login successful",
      id: userDoc._id,
      username: userDoc.username,
      user_doc: userDoc,
      token: token,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const register = async (req, res) => {
  const { username, password } = req.body;
  const salt = bcrypt.genSaltSync(Number(process.env.SALT));
  try {
    const hashPassword = bcrypt.hashSync(password, salt);
    const userDoc = await User.create({
      username,
      password: hashPassword,
    });

    res.status(200).json({ message: "Login successful", user_doc: userDoc });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const profile = async (req, res) => {
  const { token } = req.cookies;
  console.log(token);
  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      return res.status(200).json({ message: "Authorized", decoded });
    });
  } catch (err) {}
};

const logout = async (req, res) => {
  res.cookie("token", "").json("Logged out");
};

module.exports = {
  login,
  register,
  profile,
  logout,
};
