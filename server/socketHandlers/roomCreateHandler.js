const CONSTANTS = require("../constants/Constants");
const serverStore = require("../serverStore");
const roomUpdates = require("./updates/rooms");

const roomCreateHandler = (socket) => {
  console.log("room create");

  const socketId = socket.id;
  const userId = socket.user;

  const roomDetails = serverStore.addNewActiveRoom(socketId, userId);
  socket.emit(CONSTANTS.SOCKET_ACTIONS.CREATE_ROOM, {
    roomDetails,
  });

  roomUpdates.updateRooms();
};

module.exports = roomCreateHandler;
