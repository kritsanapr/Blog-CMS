const jwt = require("jsonwebtoken");

const isAuthorized = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    return res.status(200).json({ message: "Authorized", decoded });
  });
};

module.exports = {
  isAuthorized,
};
