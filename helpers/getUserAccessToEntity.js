const { createError } = require("./error");

const userAccessToEntity = async (
  owner,
  model,
  entityId,
  entityName = "Data"
) => {
  try {
    const entity = await model.findById(entityId);
    if (!entity) {
      throw createError(404, `${entityName} not found`);
    }
    if (String(entity.owner) !== String(owner)) {
      throw createError(403, "No access to data");
    }

    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = userAccessToEntity;
