const { createError } = require("../../helpers");
const { createCategory } = require("../../models/category/validationSchemas");

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
