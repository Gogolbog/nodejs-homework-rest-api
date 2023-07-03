const User = require("../../models/user");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { HttpError, sendEmail } = require("../../helpers");

const { userRegisterSchema } = require("../../schemasJoi");

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { error } = userRegisterSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "Помилка від Joi або іншої бібліотеки валідації");
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const verificationToken = nanoid();

  const avatarURL = gravatar.url(email, { d: "mm" });

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    verificationToken,
    avatarURL,
  });
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}"> Click to verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};

module.exports = register;
