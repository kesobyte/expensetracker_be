const { Category } = require("../../models");

module.exports.updateCategory = async (categoryId, data) => {
  try {
    const category = await Category.findByIdAndUpdate(categoryId, data, {
      new: true,
      select: "categoryName",
    });
    return category;
  } catch (error) {
    throw error;
  }
};
