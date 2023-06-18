const Contact = require("../../models/contact");

const { HttpError } = require("../../helpers");

const { contactSchemaJoi } = require("../../schemasJoi");

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

module.exports = updateContact;
