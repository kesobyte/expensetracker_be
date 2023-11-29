const dateValidator = require("validate-date");

const validateDate = (date) => {
  return dateValidator(
    date,
    (responseType = "boolean"),
    (dateFormat = "yyyy-mm-dd")
  );
};

module.exports = validateDate;
