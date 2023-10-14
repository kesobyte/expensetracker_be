const { regex, transactionSchema: constants } = require("../../constants");
const { model, Schema } = require("mongoose");

const transactionSchema = new Schema(
  {
    type: {
      type: String,
      enum: Object.values(constants.TRANSACTION_TYPE),
      required: true,
    },
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
      type: Schema.Types.ObjectId,
      required: true,
      ref: "category",
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
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Transaction = model("transaction", transactionSchema);

module.exports = {
  Transaction,
};
