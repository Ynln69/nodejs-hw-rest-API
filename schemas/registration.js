const Joi = require("joi");

const emailValid = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

const registerSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailValid).required(),
  subscription: Joi.string().required(),
});

module.exports = registerSchema;
