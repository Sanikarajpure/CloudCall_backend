const serverStore = require("../../serverStore");
const CONSTANTS = require("../../constants/Constants");

const updateRooms = (toSpecifiedSocketId = null) => {
  const io = serverStore.getSocketServerInstance();
  const activeRooms = serverStore.getActiveRooms();

  if (toSpecifiedSocketId) {
    io.to(toSpecifiedSocketId).emit(CONSTANTS.SOCKET_ACTIONS.ACTIVE_ROOMS, {
      activeRooms,
    });
  } else {
    io.emit(CONSTANTS.SOCKET_ACTIONS.ACTIVE_ROOMS, {
      activeRooms,
    });
  }
};

module.exports = {
  updateRooms,
};
