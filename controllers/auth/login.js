const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../models/users");
const { RequestError } = require("../../helpers");

const { JWT_SECRET } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, "Incorrect login or password");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw RequestError(401, "Incorrect login or password");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1w" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
  });
};

module.exports = login;
