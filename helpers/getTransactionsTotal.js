const {
  transactionSchema: { TRANSACTION_TYPE },
} = require("../constants");
const { Transaction } = require("../models");

const getTransactionsTotal = async (owner) => {
  try {
    const startDate = new Date();
    startDate.setDate(1); // Початок поточного місяця
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1, 0); // Кінець поточного місяця
    endDate.setHours(23, 59, 59, 999);

    const curMonthTransactions = await Transaction.aggregate([
      {
        $match: {
          owner,
          date: {
            $gte: startDate.toISOString().split("T")[0], // Більше або рівно початку місяця
            $lte: endDate.toISOString().split("T")[0], // Менше або рівно кінця місяця
          },
        },
      },
    ]);

    const curMonthSum = curMonthTransactions.reduce((acc, { sum, type }) => {
      if (type === TRANSACTION_TYPE.INCOMES) {
        acc[TRANSACTION_TYPE.INCOMES] = acc[TRANSACTION_TYPE.INCOMES]
          ? acc[TRANSACTION_TYPE.INCOMES] + sum
          : sum;
      }
      if (type === TRANSACTION_TYPE.EXPENSES) {
        acc[TRANSACTION_TYPE.EXPENSES] = acc[TRANSACTION_TYPE.EXPENSES]
          ? acc[TRANSACTION_TYPE.EXPENSES] + sum
          : sum;
      }
      return acc;
    }, {});

    let transactionsTotal = { incomes: 0, expenses: 0 };
    return { ...transactionsTotal, ...curMonthSum };
  } catch (error) {
    throw error;
  }
};

module.exports = getTransactionsTotal;
