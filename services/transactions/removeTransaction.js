const { Transaction } = require("../../models");

module.exports.removeTransaction = async (id) => {
  try {
    const transaction = await Transaction.findByIdAndRemove(id);

    return transaction;
  } catch (error) {
    throw error;
  }
};
