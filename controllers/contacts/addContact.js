const Contact = require("../../models/contact");
const { HttpError } = require("../../helpers");

const { contactSchemaJoi } = require("../../schemasJoi");

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

module.exports = addContact;
