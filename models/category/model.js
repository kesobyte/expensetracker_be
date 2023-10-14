const { Schema, model } = require("mongoose");
const { transactionSchema: constants } = require("../../constants");

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      minLength: constants.CATEGORY_NAME_LENGTH.MIN,
      maxLength: constants.CATEGORY_NAME_LENGTH.MAX,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(constants.TRANSACTION_TYPE),
      required: true,
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

const Category = model("category", categorySchema);

module.exports = {
  Category,
};
