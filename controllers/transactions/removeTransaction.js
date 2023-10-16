const { transactions: s } = require("../../services");

module.exports.removeTransaction = async (req, res, next) => {
  try {
    await s.removeTransaction(req.params.id);

    res.json().status(204);
  } catch (error) {
    next(error);
  }
};
