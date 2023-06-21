const express = require("express");
const router = express.Router();

const { authController } = require("../../controllers");
const { authenticate } = require("../../middlewares");

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/current", authenticate, authController.getCurrent);

router.post("/logout", authenticate, authController.logout);

router.patch(
  "/subscription",
  authenticate,

  authController.updateStatusSubscription
);

module.exports = router;
