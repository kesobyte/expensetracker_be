const authControllers = require("./auth");
const usersControllers = require("./users");
const categoriesControllers = require("./categories");

module.exports = {
  auth: authControllers,
  users: usersControllers,
  categories: categoriesControllers,
};
