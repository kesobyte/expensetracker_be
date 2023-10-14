const Joi = require("joi");
const { transactionSchema: constants } = require("../../constants");

const categoryCreatingSchema = Joi.object({
  categoryName: Joi.string()
    .min(constants.CATEGORY_NAME_LENGTH.MIN)
    .max(constants.CATEGORY_NAME_LENGTH.MAX)
    .required(),
  type: Joi.string()
    .valid(...Object.values(constants.TRANSACTION_TYPE))
    .required(),
});

const categoryUpdatingSchema = Joi.object({
  categoryName: Joi.string()
    .min(constants.CATEGORY_NAME_LENGTH.MIN)
    .max(constants.CATEGORY_NAME_LENGTH.MAX),
});

module.exports = {
  createCategory: categoryCreatingSchema,
  updateCategory: categoryUpdatingSchema,
};
