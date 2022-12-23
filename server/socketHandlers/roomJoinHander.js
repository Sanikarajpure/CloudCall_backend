const serverStore = require("../serverStore");
const roomUpdates = require("./updates/rooms");
const CONSTANTS = require("../constants/Constants");

const roomJoinHandler = (socket, data) => {
  const { roomId } = data;

  const participantDetails = {
    userId: socket.user,
    socketId: socket.id,
  };

  const roomDetails = serverStore.getActiveRoom(roomId);
  serverStore.joinActiveRoom(roomId, participantDetails);

  // send information to users in room that they should prepare for incoming connection
  roomDetails.participants.forEach((participant) => {
    if (participant.socketId !== participantDetails.socketId) {
      console.log(participant.socketId);
      console.log(participantDetails.socketId);
      socket
        .to(participant.socketId)
        .emit(CONSTANTS.SOCKET_ACTIONS.CONN_PREPARE, {
          connUserSocketId: participantDetails.socketId,
        });
      console.log("prep conn");
    }
  });

  roomUpdates.updateRooms();
};

module.exports = roomJoinHandler;
