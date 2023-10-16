const { transactions: s } = require("../../services");

module.exports.updateTransaction = async (req, res, next) => {
  try {
    const {
      params: { type, id: transactionId },
      body,
    } = req;
    const transaction = await s.updateTransaction(transactionId, type, body);
    res.json(transaction);
  } catch (error) {
    next(error);
  }
};
