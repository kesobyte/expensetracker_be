const { createError } = require("../../helpers");
const { transactions: s } = require("../../services");

module.exports.getTransactions = async (req, res, next) => {
  try {
    const {
      user,
      params: { type },
      query: { date = "" },
    } = req;

    const transactions = await s.getTransactions(user._id, type, date);

    res.json(transactions);
  } catch (error) {
    next(error);
  }
};
