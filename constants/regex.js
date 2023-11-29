// format -> YYYY-MM-DDThh:mm
const DATE_FULL_REGEX =
  /^(?:\d{4})-(?:0[1-9]|1[0-2])-(?:0[1-9]|1\d|2[0-8]|29(?=-02-(?:1[6-9]|[2-9]\d)(?:0[48]|[2468][048]|[13579][26]))|30(?=(?:0[13-9]|1[0-2])-))|(?:(?:\d{2})(?:0[48]|[2468][048]|[13579][26])|(?:(?:[02468][048]|[13579][26])(?:0[48]|[2468][048]|[13579][26])))-(?:02-29)T([01]\d|2[0-3]):[0-5]\d$/;
// format -> YYYY-MM-DD
// format -> hh:mm
const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const MONTH_FORMAT_REGEX = /^20[2-9][\d]-(0[1-9]|[1][012])$/;

module.exports = {
  DATE_FULL_REGEX,
  TIME_REGEX,
  EMAIL_REGEX,
  MONTH_FORMAT_REGEX,
};
