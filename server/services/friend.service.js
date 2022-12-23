const { FriendInvitation } = require("../models/friendInvitation");
const ApiError = require("../middlewares/apiError");
const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");

const createInvitation = async ({ senderId, receiverId }) => {
  try {
    console.log(senderId, receiverId);
    // const invite = await FriendInvitation.create({
    //   senderId,
    //   receiverId,
    // });

    let newInvitation = new FriendInvitation({
      senderId,
      receiverId,
    });
    await newInvitation.save();

    return newInvitation;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createInvitation,
};
