const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { schema } = require("@hapi/joi/lib/compile");

const messageSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
  },
  date: {
    type: Date,
  },
  type: {
    type: String,
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = { Message };
