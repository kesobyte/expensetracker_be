const { Transaction } = require("../../models");

module.exports.getTransactions = async (userId, type, date) => {
  try {
    const transactionSelectors = "-createdAt -updatedAt -owner";
    const categorySelectors = "categoryName";
    const transactions = date
      ? await Transaction.find(
          { owner: userId, type, date },
          transactionSelectors
        ).populate("category", categorySelectors)
      : await Transaction.find(
          { owner: userId, type },
          transactionSelectors
        ).populate("category", categorySelectors);
        
    return transactions;
  } catch (error) {
    throw error;
  }
};
