const ctrlWrapper = require("../../decorators/ctrlWrapper");

const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateStatusSubscription = require("./updateStatusSubscription");
const loadAvatar = require("./loadAvatar");
const verify = require("./verify");
const resendVerify = require("./resendVerify");

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateStatusSubscription: ctrlWrapper(updateStatusSubscription),
  loadAvatar: ctrlWrapper(loadAvatar),
  verify: ctrlWrapper(verify),
  resendVerify: ctrlWrapper(resendVerify),
};
