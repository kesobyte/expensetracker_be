const { createRouter } = require("../../helpers");
const {
  authorization,
  validateTransaction,
  userAccessToEntity,
} = require("../../middlewares");
const { transactions: c } = require("../../controllers");
const { Transaction } = require("../../models");

const options = [
  {
    route: "/",
    method: "post",
    controller: c.addTransaction,
    middlewares: [validateTransaction.addTransaction],
  },
  {
    route: "/:type",
    method: "get",
    controller: c.getTransactions,
    middlewares: [validateTransaction.checkType],
  },
  {
    route: "/:type/:id",
    method: "patch",
    controller: c.updateTransaction,
    middlewares: [
      userAccessToEntity(Transaction, "Transaction"),
      validateTransaction.checkType,
      validateTransaction.updateTransaction,
    ],
  },
  {
    route: "/:id",
    method: "delete",
    controller: c.removeTransaction,
    middlewares: [userAccessToEntity(Transaction, "Transaction")],
  },
];

const transactionsRouter = createRouter({
  options,
  defaultMiddlewares: [authorization.accessToken],
});

transactionsRouter.setRouter();

module.exports = transactionsRouter.router;
