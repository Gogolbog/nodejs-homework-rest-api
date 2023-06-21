const { HttpError } = require("../../helpers");
const { User } = require("../../models");

const logout = async (req, res) => {
  const { id } = req.user;

  const user = await User.findById(id);

  if (!user) throw HttpError(401);

  await User.findByIdAndUpdate(id, { token: "" });
  res.status(204).send();
};

module.exports = logout;
