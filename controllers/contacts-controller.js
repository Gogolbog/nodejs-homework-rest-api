const contactsServices = require("../models/contacts");

const Joi = require("joi");

const { HttpError } = require("../helpers");

const ctrlWrapper = require("../decorators/ctrlWrapper");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\+380-\d{2}-\d{3}-\d{2}-\d{2}$/)
    .required(),
}).messages({
  "any.required": "{{#label}} field is required.",
  "string.email": "Invalid email format.",
  "string.pattern.base":
    "Invalid phone format. Please use the format '+380-XX-XXX-XX-XX'.",
});

const getAllContacts = async (req, res) => {
  const result = await contactsServices.listContacts();
  res.json(result);
};
const getContactsById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsServices.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "Missing required name field");
  } else {
    const result = await contactsServices.addContact(req.body);
    res.status(201).json(result);
  }
};

const updateContact = async (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing fields");
  }
  const { contactId } = req.params;
  const result = await contactsServices.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, error.message);
  }
  res.json(result);
};

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsServices.removeContact(contactId);
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
  deleteContactById: ctrlWrapper(deleteContactById),
};
