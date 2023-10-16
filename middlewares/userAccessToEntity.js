const getUserAccessToEntity = require("../helpers/getUserAccessToEntity");

const userAccessToEntity =
  (model, entityName, entityIdName = "id") =>
  async (req, res, next) => {
    try {
      const { user, params } = req;
      const entity = await getUserAccessToEntity(
        user._id,
        model,
        params[entityIdName],
        entityName
      );
      req.entity = entity;
      next();
    } catch (error) {
      next(error);
    }
  };

module.exports = userAccessToEntity;
