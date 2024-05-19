import Joi from "joi";

export const signUpSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required().min(6).max(15),
  fullName: Joi.string().required(),
  confirmPassword: Joi.string().required().min(6).max(15),
  gender: Joi.string().required(),
});

export const loginSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required().min(6).max(15),
});
