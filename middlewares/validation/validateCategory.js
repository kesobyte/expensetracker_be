const { createError } = require("../../helpers");
const {
  createCategory,
  updateCategory,
} = require("../../models/category/validationSchemas");

module.exports.addCategory = async (req, res, next) => {
  try {
    const { error } = createCategory.validate(req.body);

    if (error) {
      throw createError(400, error.message);
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports.updateCategory = async (req, res, next) => {
  try {
    const { error } = updateCategory.validate(req.body);

    if (error) {
      throw createError(400, error.message);
    }
    next();
  } catch (error) {
    next(error);
  }
};
