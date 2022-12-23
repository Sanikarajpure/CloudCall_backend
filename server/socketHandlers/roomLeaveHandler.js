const serverStore = require("../serverStore");
const roomUpdates = require("./updates/rooms");
const CONSTANTS = require("../constants/Constants");

const roomLeaveHadnler = (socket, data) => {
  const { roomId } = data;

  const activeRoom = serverStore.getActiveRoom(roomId);

  if (activeRoom) {
    serverStore.leaveActiveRoom(roomId, socket.id);
    const updatedActiveRoom = serverStore.getActiveRoom(roomId);

    if (updatedActiveRoom) {
      updatedActiveRoom.participants.forEach((participant) => {
        socket
          .to(participant.socketId)
          .emit(CONSTANTS.SOCKET_ACTIONS.PARTICIPANT_LEFT_ROOM, {
            connUserSocketId: socket.id,
          });
      });
    }
    roomUpdates.updateRooms();
  }
};

module.exports = roomLeaveHadnler;
