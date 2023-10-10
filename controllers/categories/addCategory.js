const { categories: s } = require("../../services");

module.exports.addCategory = async (req, res, next) => {
  try {
    const category = await s.addCategory(req.body, req.user._id);

    res.json(category).status(201);
  } catch (error) {
    next(error);
  }
};
