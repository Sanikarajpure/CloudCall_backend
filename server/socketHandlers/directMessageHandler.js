const { Message } = require("../models/message");
const { Conversation } = require("../models/conversation");
const { updateChatHistory } = require("./updates/chat");

const directMessageHandler = async (socket, data) => {
  try {
    console.log("direct message event is being handled");

    const { userId } = socket.user;
    const { receiverUserId, content } = data;

    // create new message

    let message = new Message({
      content: content,
      author: socket.user,
      date: new Date(),
      type: "DIRECT",
    });
    await message.save();

    // find if conversation exist with this two users - if not create new
    const conversation = await Conversation.findOne({
      participants: { $all: [socket.user, receiverUserId] },
    });

    if (conversation) {
      conversation.messages.push(message._id);
      await conversation.save();

      // perform and update to sender and receiver if is online
      updateChatHistory(conversation._id.toString());
    } else {
      // create new conversation if not exists

      let newConversation = new Conversation({
        messages: [message._id],
        participants: [socket.user, receiverUserId],
      });
      await newConversation.save();

      // perform and update to sender and receiver if is online
      updateChatHistory(newConversation._id.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = directMessageHandler;
