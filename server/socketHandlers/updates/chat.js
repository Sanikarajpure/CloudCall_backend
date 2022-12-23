const { Conversation } = require("../../models/conversation");
const serverStore = require("../../serverStore");
const CONSTANTS = require("../../constants/Constants");

const updateChatHistory = async (
  conversationId,
  toSpecifiedSocketId = null
) => {
  const conversation = await Conversation.findById(conversationId).populate({
    path: "messages",
    model: "Message",
    populate: {
      path: "author",
      model: "User",
      select: "firstName lastName _id",
    },
  });

  if (conversation) {
    const io = serverStore.getSocketServerInstance();

    if (toSpecifiedSocketId) {
      // initial update of chat history
      return io
        .to(toSpecifiedSocketId)
        .emit(CONSTANTS.SOCKET_ACTIONS.DIRECT_CHAT_HISTORY, {
          messages: conversation.messages,
          participants: conversation.participants,
        });
    }

    // check if users of this conversation are online
    // if yes emit to them update of messages

    conversation.participants.forEach((id) => {
      let userId = id.toString();
      console.log(userId);
      const activeConnections = serverStore.getActiveConnections(userId);

      activeConnections.forEach((socketId) => {
        io.to(socketId).emit(CONSTANTS.SOCKET_ACTIONS.DIRECT_CHAT_HISTORY, {
          messages: conversation.messages,
          participants: conversation.participants,
        });
      });
    });
  }
};

module.exports = { updateChatHistory };
