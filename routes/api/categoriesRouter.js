const { createRouter } = require("../../helpers");
const {
  authorization,
  validateCategory,
  userAccessToEntity,
  checkCategoryRemoving,
} = require("../../middlewares");
const { categories: c } = require("../../controllers");
const { Category } = require("../../models");

const categoriesRouter = createRouter({
  defaultMiddlewares: [authorization.accessToken],
  options: [
    {
      route: "/",
      method: "post",
      controller: c.addCategory,
      middlewares: [validateCategory.addCategory],
    },
    {
      route: "/",
      method: "get",
      controller: c.getCategories,
      middlewares: null,
    },
    {
      route: "/:id",
      method: "patch",
      controller: c.updateCategory,
      middlewares: [
        userAccessToEntity(Category, "Category"),
        validateCategory.updateCategory,
      ],
    },
    {
      route: "/:id",
      method: "delete",
      controller: c.removeCategory,
      middlewares: [userAccessToEntity(Category, "Category"), checkCategoryRemoving],
    },
  ],
});

categoriesRouter.setRouter();

module.exports = categoriesRouter.router;
