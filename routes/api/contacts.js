const express = require("express");
const router = express.Router();

const { contactsController } = require("../../controllers");

const { isValidId, authenticate } = require("../../middlewares");

router.use(authenticate);

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", isValidId, contactsController.getContactById);

router.post("/", contactsController.addContact);

router.delete("/:contactId", isValidId, contactsController.deleteContactById);

router.put("/:contactId", isValidId, contactsController.updateContact);

router.patch(
  "/:contactId/favorite",
  isValidId,
  contactsController.updateStatusContact
);

module.exports = router;
