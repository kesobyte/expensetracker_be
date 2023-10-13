const { categories: s } = require("../../services");

module.exports.removeCategory = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    await s.removeCategory(id);
    res.json().status(204);
  } catch (error) {
    next(error);
  }
};
