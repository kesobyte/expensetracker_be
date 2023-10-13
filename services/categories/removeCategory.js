const { Category } = require("../../models");

module.exports.removeCategory = async (id) => {
  try {
    await Category.deleteOne({ _id: id });
    return null;
  } catch (error) {
    throw error;
  }
};
