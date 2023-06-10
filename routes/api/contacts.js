const express = require("express");

const contactsController = require("../../controllers/contacts-controller");

const router = express.Router();

const { isValidId } = require("../../middlewares");

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", isValidId, contactsController.getContactsById);

router.post("/", contactsController.addContact);

router.delete("/:contactId", isValidId, contactsController.deleteContactById);

router.put("/:contactId", isValidId, contactsController.updateContact);

router.patch(
  "/:contactId/favorite",
  isValidId,
  contactsController.updateStatusContact
);

module.exports = router;
