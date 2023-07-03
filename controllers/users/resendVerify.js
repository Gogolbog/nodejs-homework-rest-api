const { HttpError } = require("../../helpers");
const { User } = require("../../models");
const { userEmailSchema } = require("../../schemasJoi");

const resendVerify = async (req, res) => {
  const { error } = userEmailSchema.validate(req.body);
  if (error) throw HttpError(400, "missing required field email");

  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.verify)
    throw HttpError(400, "Verification has already been passed");

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}"> Click to verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({ message: "Verification email sent" });
};

module.exports = resendVerify;
