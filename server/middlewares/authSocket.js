const { valid } = require("@hapi/joi");
const userService = require("../services/user.service");
require("dotenv").config();

const verifyTokenSocket = async (socket, next) => {
  const token = socket.handshake.auth?.token;

  try {
    let validToken = await userService.validateToken(token);
    socket.user = validToken.id;
  } catch (err) {
    const socketError = new Error("NOT AUTHORIZED");
    return next(socketError);
  }

  next();
};

module.exports = verifyTokenSocket;
