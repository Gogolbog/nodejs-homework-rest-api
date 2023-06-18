const ctrlWrapper = require("../../decorators/ctrlWrapper");

const getAllContacts = require("./getAllContacts");
const addContact = require("./addContact");
const deleteContactById = require("./deleteContactById");
const getContactById = require("./getContactById");
const updateContact = require("./updateContact");
const updateStatusContact = require("./updateStatusContact");

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  deleteContactById: ctrlWrapper(deleteContactById),
};
