const { categories: s } = require("../../services");

module.exports.removeCategory = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    await s.removeCategory(id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
