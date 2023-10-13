const { Router } = require("express");

class RouterCreator {
  #options;
  #defaultMiddlewares;
  #router;

  constructor({ options, defaultMiddlewares = [] }) {
    this.#router = Router();
    this.#options = options;
    this.#defaultMiddlewares = defaultMiddlewares;
  }

  get router() {
    return this.#router;
  }

  setRouter() {
    this.#options.forEach(({ route, method, controller, middlewares }) => {
      if (!route || !method || !controller) return;
      const dm = this.#defaultMiddlewares;
      const m =
        middlewares && dm.length
          ? dm.concat(middlewares)
          : middlewares
          ? middlewares
          : dm.length
          ? dm
          : null;
      m
        ? this.#router[method](route, ...m, controller)
        : this.#router[method](route, controller);
    });
  }
}

const createRouter = ({ options, defaultMiddlewares }) => {
  return new RouterCreator({ options, defaultMiddlewares });
};

module.exports = createRouter;
