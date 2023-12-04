const { createError } = require("../helpers");
const { Transaction } = require("../models");

const checkCategoryRemoving = async (req, res, next) => {
  try {
    const { params, user } = req;
    const transaction = await Transaction.findOne({
      owner: user._id,
      category: params.id,
    });
    if (transaction) {
      throw createError(
        409,
        "Can`t remove! Some transactions depend on this category"
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkCategoryRemoving;
