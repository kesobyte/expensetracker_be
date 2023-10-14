const { Category } = require("../../models");

module.exports.addCategory = async (body, userId) => {
  // body -> {categoryName, type}
  try {
    const userCategories = await Category.find({ owner: userId });
    const reqCategoryName = body.categoryName.toLowerCase();
    if (
      userCategories.some(
        (el) =>
          el.type === body.type &&
          el.categoryName.toLowerCase === reqCategoryName
      )
    ) {
      throw createError(400, "Category already exists");
    }

    const category = await Category.create({
      type: body.type,
      categoryName: body.categoryName,
      owner: userId,
    });

    const { _id, categoryName, type } = category;

    return { _id, categoryName, type };
  } catch (error) {
    throw error;
  }
};
