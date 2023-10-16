const { Category } = require("../../models");

module.exports.removeCategory = async (id) => {
  try {
    const category = await Category.findByIdAndRemove(id);
    return category;
  } catch (error) {
    throw error;
  }
};
