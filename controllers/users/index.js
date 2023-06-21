const ctrlWrapper = require("../../decorators/ctrlWrapper");

const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateStatusSubscription = require("./updateStatusSubscription");

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateStatusSubscription: ctrlWrapper(updateStatusSubscription),
};
