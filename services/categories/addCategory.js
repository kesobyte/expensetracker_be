const { Category } = require("../../models");

module.exports.addCategory = async (body, userId) => {
  // body -> {name, type}
  try {
    const userCategories = await Category.find({ owner: userId });
    const bodyName = body.name.trim().toLowerCase();
    if (
      userCategories.some(
        (el) => el.type === body.type && el.name.toLowerCase === bodyName
      )
    ) {
      throw createError(400, "Category already exists");
    }

    const category = await Category.create({
      type: body.type,
      name: body.name.trim(),
      owner: userId,
    });

    const { _id, name, type } = category;

    return { _id, name, type };
  } catch (error) {
    throw error;
  }
};
