const Joi = require("joi");

const { emailRegexp } = require("../constants/users");

const userRegisterSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const updateStatusSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

module.exports = {
  userRegisterSchema,
  updateStatusSubscriptionSchema,
};
