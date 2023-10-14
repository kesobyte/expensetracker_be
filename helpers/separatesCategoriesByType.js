const { TRANSACTION_TYPE } = require("../constants/transactionSchema");

const separatesCategoriesByType = (categories) =>
  !categories.length
    ? {
        [TRANSACTION_TYPE.INCOMES]: [],
        [TRANSACTION_TYPE.EXPENSES]: [],
      }
    : categories.reduce((acc, { type, categoryName, _id }) => {
        const category = { type, categoryName, _id };
        if (!acc[type]) {
          acc[type] = [category];
        } else {
          acc[type].push(category);
        }
        return acc;
      }, {});

module.exports = separatesCategoriesByType;
