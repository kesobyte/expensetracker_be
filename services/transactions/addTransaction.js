const { createError } = require("../../helpers");
const { Transaction, Category } = require("../../models");

module.exports.addTransaction = async (userId, body) => {
  // body -> {categoryName, type, date, time, category, sum, comment}
  try {
    const userCategory = await Category.findOne(
      { _id: body.categoryId },
      "-createdAt -updatedAt"
    );

    if (!userCategory || userCategory.type !== body.type) {
      throw createError(400, "Bad request, category or it type is wrong");
    }

    if (String(userId) !== String(userCategory.owner)) {
      throw createError(403, "No access to category");
    }

    const { categoryId, ...rest } = body;

    const transaction = await Transaction.create({
      ...rest,
      category: categoryId,
      owner: userId,
    });
    const { _id, categoryName, type, date, time, sum, comment } = transaction;

    return {
      _id,
      categoryName,
      type,
      date,
      time,
      category: {
        _id: userCategory._id,
        categoryName: userCategory.categoryName,
      },
      sum,
      comment,
    };
  } catch (error) {
    throw error;
  }
};
