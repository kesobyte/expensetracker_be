const { createError, updateError } = require("./error");
const tokenTools = require("./tokenTools");
const passwordTools = require("./passwordTools");
const filesTools = require("./filesTools");
const addWaterNotesList = require("./addWaterNotesList");
const monthBreakPoints = require("./monthBreakPoints");
const getCurrentDayBreakPoints = require("./getCurrentDayBreakPoints");
const getHoursDiff = require("./getHoursDiff");
const getUserAccessToEntity = require("./getUserAccessToEntity");
const createRouter = require("./createRouter");
const separatesCategoriesByType = require("./separatesCategoriesByType");
const { middlewareContainer } = require("./middlewareContainer");

module.exports = {
  createError,
  updateError,
  tokenTools,
  passwordTools,
  filesTools,
  addWaterNotesList,
  monthBreakPoints,
  getCurrentDayBreakPoints,
  getHoursDiff,
  getUserAccessToEntity,
  createRouter,
  separatesCategoriesByType,
  middlewareContainer,
};
