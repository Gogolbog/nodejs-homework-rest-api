const Joi = require("joi");

const { numberPattern } = require("../constants/contact");

const contactSchemaJoi = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name field is required.",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email field is required.",
    "string.email": "Invalid email format.",
  }),
  favorite: Joi.boolean(),
  phone: Joi.string().pattern(numberPattern).required().messages({
    "any.required": "Phone field is required.",
    "string.pattern.base":
      "Invalid phone format. Please use the format '+380-XX-XXX-XX-XX'.",
  }),
}).messages({
  "object.base": "Invalid input format.",
});

const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { contactSchemaJoi, contactUpdateFavoriteSchema };
