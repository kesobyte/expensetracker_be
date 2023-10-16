const { createError } = require("../../helpers");
const { Transaction } = require("../../models");

module.exports.updateTransaction = async (transactionId, type, body) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: transactionId, type },
      body,
      {
        new: true,
        select: "-createdAt -updatedAt -owner",
      }
    ).populate("category", "categoryName");
    if (!transaction) {
      throw createError(404, "Transaction not found");
    }
    return transaction;
  } catch (error) {
    throw error;
  }
};
