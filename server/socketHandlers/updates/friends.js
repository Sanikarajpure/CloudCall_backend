const { User } = require("../../models/user");
const { FriendInvitation } = require("../../models/friendInvitation");
const serverStore = require("../../serverStore");
const CONSTANTS = require("../../constants/Constants");

const updateFriendsPendingInvitations = async (userId) => {
  try {
    const pendingInvitations = await FriendInvitation.find({
      receiverId: userId,
    }).populate("senderId", "_id email firstName lastName");

    //find all active connection for specific user
    const receiverList = serverStore.getActiveConnections(userId);

    const io = serverStore.getSocketServerInstance();

    receiverList.forEach((receiverSocketId) => {
      io.to(receiverSocketId).emit(CONSTANTS.SOCKET_ACTIONS.FRIEND_INVITATION, {
        pendingInvitations: pendingInvitations ? pendingInvitations : [],
      });
    });
  } catch (err) {
    console.log(err);
  }
};

const updateFriends = async (userId) => {
  try {
    //find active connections of specific id(online users)
    const receiverList = serverStore.getActiveConnections(userId);
    if (receiverList.length > 0) {
      const user = await User.findById(userId, { _id: 1, friends: 1 }).populate(
        "friends",
        "id firstName lastName email"
      );

      if (user) {
        const friendList = user.friends.map((f) => {
          return {
            id: f._id,
            email: f.email,
            firstName: f.firstName,
            lastName: f.lastName,
          };
        });
        const io = serverStore.getSocketServerInstance();
        receiverList.forEach((receiverSocketId) => {
          io.to(receiverSocketId).emit(
            CONSTANTS.SOCKET_ACTIONS.UPDATE_FRIENDS,
            {
              friends: friendList ? friendList : [],
            }
          );
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const updateChatHistory = (conversationId) => {};

module.exports = {
  updateFriendsPendingInvitations,
  updateFriends,
  updateChatHistory,
};
