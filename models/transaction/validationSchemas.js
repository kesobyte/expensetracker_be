const Joi = require("joi");
const { transactionSchema: constants, regex } = require("../../constants");
const validateDate = require("../../helpers/validateDate");

const transactionCreatingSchema = Joi.object({
  type: Joi.string()
    .valid(...Object.values(constants.TRANSACTION_TYPE))
    .required(),
  date: Joi.any()
    .custom((value, helpers) => {
      if (validateDate(value)) return value;
      return helpers.error("any.custom", { message: "Invalid date" });
    })
    .required(),
  time: Joi.string().pattern(regex.TIME_REGEX).required(),
  category: Joi.string().required(),
  sum: Joi.number()
    .min(constants.TRANSACTION_SUM.MIN)
    .max(constants.TRANSACTION_SUM.MAX)
    .required(),
  comment: Joi.string()
    .min(constants.TRANSACTION_COMMENT_LENGTH.MIN)
    .max(constants.TRANSACTION_COMMENT_LENGTH.MAX),
});

const transactionUpdatingSchema = Joi.object({
  date: Joi.any().custom((value, helpers) => {
    if (validateDate(value)) return value;
    return helpers.error("any.custom", { message: "Invalid date" });
  }),
  time: Joi.string().pattern(regex.TIME_REGEX),
  category: Joi.string(),
  sum: Joi.number()
    .min(constants.TRANSACTION_SUM.MIN)
    .max(constants.TRANSACTION_SUM.MAX),
  comment: Joi.string()
    .min(constants.TRANSACTION_COMMENT_LENGTH.MIN)
    .max(constants.TRANSACTION_COMMENT_LENGTH.MAX),
});

module.exports = {
  addTransaction: transactionCreatingSchema,
  updateTransaction: transactionUpdatingSchema,
};
