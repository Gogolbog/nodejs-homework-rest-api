const Contact = require("../models/contact");

const { HttpError } = require("../helpers");

const {
  contactSchemaJoi,
  contactUpdateFavoriteSchema,
} = require("../schemasJoi");

const ctrlWrapper = require("../decorators/ctrlWrapper");

const getAllContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};
const getContactsById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { error } = contactSchemaJoi.validate(req.body);
  if (error) {
    const errorMessage = error.details[0].message;
    throw HttpError(400, errorMessage);
  } else {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  }
};

const updateContact = async (req, res) => {
  console.log(req.body);
  const { error } = contactSchemaJoi.validate(req.body);
  if (error) {
    const errorMessage = error.details[0].message;
    throw HttpError(400, errorMessage);
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, error.message);
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  console.log(req.body);
  const { error } = contactUpdateFavoriteSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing field favorite");
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, error.message);
  }
  res.json({
    message: "contact deleted",
  });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactsById: ctrlWrapper(getContactsById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  deleteContactById: ctrlWrapper(deleteContactById),
};
