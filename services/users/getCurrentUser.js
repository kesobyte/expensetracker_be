const {
  separatesCategoriesByType,
  getTransactionsTotal,
} = require("../../helpers");
const { User, Category } = require("../../models");

const getCurrentUser = async (user) => {
  try {
    const userData = await User.findById(
      user._id,
      "-createdAt -password -updatedAt"
    );
    const userCategories = await Category.find({ owner: user._id });

    const transactionsTotal = await getTransactionsTotal(user._id);

    const categories = separatesCategoriesByType(userCategories);

    return { ...userData._doc, categories, transactionsTotal };
  } catch (error) {
    throw error;
  }
};

module.exports = getCurrentUser;
