const fs = require("fs");
const path = require("path");
const Jimp = require("jimp");
const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const loadAvatar = async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  if (!req.file) {
    throw HttpError(401, "No avatar file provided");
  }
};

module.exports = loadAvatar;
