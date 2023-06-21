const Contact = require("../../models/contact");
const { HttpError } = require("../../helpers");

const { contactSchemaJoi } = require("../../schemasJoi");

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { error } = contactSchemaJoi.validate(req.body);
  if (error) {
    const errorMessage = error.details[0].message;
    throw HttpError(400, errorMessage);
  } else {
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
  }
};

module.exports = addContact;
