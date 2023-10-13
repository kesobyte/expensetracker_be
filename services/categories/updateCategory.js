const { Category } = require("../../models");

module.exports.updateCategory = async (categoryId, data) => {
  try {
    const category = await Category.findByIdAndUpdate(categoryId, data, {
      new: true,
      select: "name",
    });
    return category;
  } catch (error) {
    throw error;
  }
};
