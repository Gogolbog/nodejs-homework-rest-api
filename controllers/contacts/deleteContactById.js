const Contact = require("../../models/contact");

const { HttpError } = require("../../helpers");

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

module.exports = deleteContactById;
