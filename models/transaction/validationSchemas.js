const Joi = require("joi");
const { transactionSchema: constants, regex } = require("../../constants");

const transactionCreatingSchema = Joi.object({
  type: Joi.string()
    .valid(...Object.values(constants.TRANSACTION_TYPE))
    .required(),
  date: Joi.string().pattern(regex.DATE_REGEX).required(),
  time: Joi.string().pattern(regex.TIME_REGEX),
  categoryId: Joi.string().required(),
  sum: Joi.number()
    .min(constants.TRANSACTION_SUM.MIN)
    .max(constants.TRANSACTION_SUM.MAX)
    .required(),
  comment: Joi.string()
    .min(constants.TRANSACTION_COMMENT_LENGTH.MIN)
    .max(constants.TRANSACTION_COMMENT_LENGTH.MAX)
    .required(),
});

const transactionUpdatingSchema = Joi.object({
  date: Joi.string().pattern(regex.DATE_REGEX),
  time: Joi.string().pattern(regex.TIME_REGEX),
  category: Joi.string()
    .min(constants.CATEGORY_NAME_LENGTH.MIN)
    .max(constants.CATEGORY_NAME_LENGTH.MAX),
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
