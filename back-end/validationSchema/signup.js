const Joi = require("joi");

const signupValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(1).required(),
    lastName: Joi.string().min(1).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(3).required(),
  });

  return schema.validate(data);
};

module.exports.signupValidation = signupValidation;
