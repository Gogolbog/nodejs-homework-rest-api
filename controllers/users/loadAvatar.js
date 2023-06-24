const fs = require("fs");
const path = require("path");
const Jimp = require("jimp");
const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const avatarsDir = path.resolve("public", "avatars");

const loadAvatar = async (req, res, next) => {
  if (!req.file) return next(HttpError(400, "No avatar file provided"));
  const { path: oldPath, originalname } = req.file;
  const newPath = path.join(avatarsDir, originalname);

  try {
    const avatar = await Jimp.read(oldPath);
    await avatar.resize(250, 250).writeAsync(newPath);

    await fs.promises.unlink(oldPath);

    const avatarURL = path.join("avatars", originalname);

    const { _id: id } = req.user;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { avatarURL },
      { new: true }
    );

    if (!updatedUser) throw new HttpError(404);

    res.json({
      avatarURL,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = loadAvatar;
