const { createRouter } = require("../../helpers");
const { authorization, validateTransaction } = require("../../middlewares");
const { transactions: c } = require("../../controllers");

const options = [
  {
    route: "/",
    method: "post",
    controller: c.addTransaction,
    middlewares: [validateTransaction.addTransaction],
  },
];

const transactionsRouter = createRouter({
  options,
  defaultMiddlewares: [authorization.accessToken],
});

transactionsRouter.setRouter();

module.exports = transactionsRouter.router;
