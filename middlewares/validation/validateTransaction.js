const { createError } = require("../../helpers");
const { transactionValidationSchemas: v } = require("../../models");

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
