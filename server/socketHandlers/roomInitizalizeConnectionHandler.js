const CONSTANTS = require("../constants/Constants");

const roomInitizalizeConnectionHandler = (socket, data) => {
  const { connUserSocketId } = data;

  const initData = {
    connUserSocketId: socket.id,
  };

  socket
    .to(connUserSocketId)
    .emit(CONSTANTS.SOCKET_ACTIONS.CONN_INIT, initData);
};

module.exports = roomInitizalizeConnectionHandler;
