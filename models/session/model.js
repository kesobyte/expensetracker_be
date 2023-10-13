const { Schema, model } = require("mongoose");

const sessionSchema = Schema({
  uid: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

module.exports.Session = model("session", sessionSchema);
