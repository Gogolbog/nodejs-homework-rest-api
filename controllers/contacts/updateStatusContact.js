const Contact = require("../../models/contact");

const { HttpError } = require("../../helpers");

const { contactUpdateFavoriteSchema } = require("../../schemasJoi");

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

module.exports = updateStatusContact;
