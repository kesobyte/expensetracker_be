const { categorySchema } = require("../category/model");
const { regex, transactionSchema: constants } = require("../../constants");
const { model } = require("mongoose");

const transactionSchema = categorySchema.clone({
  date: {
    type: String,
    match: regex.DATE_REGEX,
    required: true,
  },
  time: {
    type: String,
    match: regex.TIME_REGEX,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  sum: {
    type: Number,
    required: true,
    min: constants.TRANSACTION_SUM.MIN,
    max: constants.TRANSACTION_SUM.MAX,
  },
  comment: {
    type: String,
    required: true,
    minlength: constants.TRANSACTION_COMMENT_LENGTH.MIN,
    maxlength: constants.TRANSACTION_COMMENT_LENGTH.MAX,
  },
});

const Transaction = model("transaction", transactionSchema);

module.exports = {
  Transaction,
};
