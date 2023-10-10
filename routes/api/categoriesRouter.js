const { createRouter } = require("../../helpers");
const { authorization, validateCategory } = require("../../middlewares");
const { categories: c } = require("../../controllers");

const categoriesRouter = createRouter({
  defaultMiddlewares: [authorization.accessToken],
  options: [
    {
      route: "/",
      method: "post",
      controller: c.addCategory,
      middlewares: [validateCategory.addCategory], // []
    },
  ],
});

categoriesRouter.setRouter();

module.exports = categoriesRouter.router;
