const express = require("express");

const contactsController = require("../../controllers/contacts-controller");

const router = express.Router();

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", contactsController.getContactsById);

router.post("/", contactsController.addContact);

router.delete("/:contactId", contactsController.deleteContactById);

router.put("/:contactId", contactsController.updateContact);

module.exports = router;
