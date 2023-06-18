const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const { userRegisterSchema } = require("../../schemasJoi");
const { HttpError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { error } = userRegisterSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "Помилка від Joi або іншої бібліотеки валідації");
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const passwordCompare = await bcrypt.compare(password, user?.password);

  if (!user || !passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  res.json({
    token,
  });
};

module.exports = login;
