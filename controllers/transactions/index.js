const { addTransaction } = require("./addTransaction");
const { getTransactions } = require("./getTransactions");
const { updateTransaction } = require("./updateTransaction");
const { removeTransaction } = require("./removeTransaction");

module.exports = {
  addTransaction,
  getTransactions,
  updateTransaction,
  removeTransaction,
};
