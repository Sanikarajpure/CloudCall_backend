const serverStore = require("../serverStore");
const {
  updateFriendsPendingInvitations,
  updateFriends,
} = require("../socketHandlers/updates/friends");
const { updateRooms } = require("./updates/rooms");

const newConnectionHandler = async (socket, io) => {
  serverStore.addNewConnectedUser({
    socketId: socket.id,
    userId: socket.user,
  });

  //update pending friend invitation list
  updateFriendsPendingInvitations(socket.user);

  //update friends list
  updateFriends(socket.user);

  setTimeout(() => {
    updateRooms(socket.id);
  }, [500]);
};

module.exports = newConnectionHandler;
