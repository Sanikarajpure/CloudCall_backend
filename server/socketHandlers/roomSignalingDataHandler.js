const CONSTANTS = require("../constants/Constants");

const roomSignalingDataHandler = (socket, data) => {
  const { connUserSocketId, signal } = data;

  const signalingData = {
    signal,
    connUserSocketId: socket.id,
  };

  socket
    .to(connUserSocketId)
    .emit(CONSTANTS.SOCKET_ACTIONS.CONN_SIGNAL, signalingData);
};

module.exports = roomSignalingDataHandler;
