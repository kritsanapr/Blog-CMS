const login = async (req, res) => {
  const { username, password } = req.body;
  console.log({ username, password });
  res.status(200).json({ message: "Login successful" });
};
const register = async (req, res) => {
  const { username, password } = req.body;
  console.log({ username, password });
  res.status(200).json({ message: "Register successful" });
};

module.exports = {
  login,
  register,
};
