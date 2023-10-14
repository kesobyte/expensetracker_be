const { transactions: s } = require("../../services");

const addTransaction = async (req, res, next) => {
  try {
    const { user, body } = req;
    const transaction = await s.addTransaction(user._id, body);

    res.json(transaction).status(201);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addTransaction,
};
