import Joi from "joi";

export const sendMessageValidator = Joi.object().keys({
  message: Joi.string().required(),
});

export const getMessageValidator = Joi.object().keys({
  id: Joi.string().required(),
});
