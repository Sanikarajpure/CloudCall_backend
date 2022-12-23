require("dotenv").config();
module.exports = {
  APP: {},
  APP_VALIDATIONS: {
    idValidation: { version: "uuidv4" },
    strongPasswordRegex:
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
    phoneRegex: /^[6-9]\d{9}$/,
    tableNumberRegEx: /^[1-9][0-9]*$/,
    noWhiteSpaces: /^\S*$/,
  },
  SOCKET_ACTIONS: {
    FRIEND_INVITATION: "friendInvitation",
    UPDATE_FRIENDS: "updateFriends",
    ONLINE_USERS: "onlineUsers",
    SEND_DIRECT_MESSAGE: "sendDirectMessage",
    DIRECT_CHAT_HISTORY: "directChatHistory",
    CREATE_ROOM: "createRoom",
    ACTIVE_ROOMS: "activeRooms",
    JOIN_ROOM: "joinRoom",
    LEAVE_ROOM: "leaveRoom",
    CONN_PREPARE: "connPrepare",
    CONN_INIT: "connInit",
    CONN_SIGNAL: "connSignal",
    PARTICIPANT_LEFT_ROOM: "participantLeftRoom",
  },
};
