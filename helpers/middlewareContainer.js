module.exports.middlewareContainer = (cb) => async (req, res, next) => {
  try {
    await cb(req, res, next);
    next();
  } catch (error) {
    next(error);
  }
};
