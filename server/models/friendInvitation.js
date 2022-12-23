const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { schema } = require("@hapi/joi/lib/compile");

const friendInvitationSchema = mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const FriendInvitation = mongoose.model(
  "FriendInvitation",
  friendInvitationSchema
);

module.exports = { FriendInvitation };
