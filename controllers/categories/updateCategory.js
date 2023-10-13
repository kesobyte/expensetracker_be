const { categories: s } = require("../../services");

module.exports.updateCategory = async (req, res, next) => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const category = await s.updateCategory(id, body);
    res.json(category);
  } catch (error) {
    next(error);
  }
};
