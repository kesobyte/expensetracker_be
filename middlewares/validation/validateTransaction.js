const { createError } = require("../../helpers");
const { transactionValidationSchemas: v } = require("../../models");
const { transactionSchema } = require("../../constants");

module.exports.addTransaction = async (req, res, next) => {
  try {
    const { error } = v.addTransaction.validate(req.body);

    if (error) {
      throw createError(400, error.message);
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports.updateTransaction = async (req, res, next) => {
  try {
    const { error } = v.updateTransaction.validate(req.body);

    if (error) {
      throw createError(400, error.message);
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports.checkType = async (req, res, next) => {
  try {
    const types = Object.values(transactionSchema.TRANSACTION_TYPE);
    if (!types.includes(req.params.type)) {
      throw createError(
        400,
        `Invalid request, type must be one of ${JSON.stringify(types)}`
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};
