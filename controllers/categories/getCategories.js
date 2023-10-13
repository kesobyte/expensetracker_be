const { categories: s } = require("../../services");

module.exports.getCategories = async (req, res, next) => {
  try {
    const categories = await s.getCategories(req.user._id);
    res.json(categories);
  } catch (error) {
    next(error);
  }
};
