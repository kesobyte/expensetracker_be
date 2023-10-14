const authControllers = require("./auth");
const usersControllers = require("./users");
const categoriesControllers = require("./categories");
const transactionsControllers = require("./transactions");

module.exports = {
  auth: authControllers,
  users: usersControllers,
  categories: categoriesControllers,
  transactions: transactionsControllers,
};
