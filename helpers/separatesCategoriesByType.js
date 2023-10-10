const { TRANSACTION_TYPE } = require("../constants/transactionSchema");

const separatesCategoriesByType = (categories) =>
  !categories.length
    ? {
        [TRANSACTION_TYPE.INCOMES]: [],
        [TRANSACTION_TYPE.EXPENCES]: [],
      }
    : categories.reduce((acc, { type, name, _id }) => {
        const category = { type, name, _id };
        if (!acc[type]) {
          acc[type] = [category];
        } else {
          acc[type].push(category);
        }
        return acc;
      }, {});

module.exports = separatesCategoriesByType;
