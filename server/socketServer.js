const authSocket = require("./middlewares/authSocket");
const newConnectionHandler = require("./socketHandlers/newConnectionHandler");
const disconnectHandler = require("./socketHandlers/disconnectHandler");
const directMessageHandler = require("./socketHandlers/directMessageHandler");
const directChatHistoryHandler = require("./socketHandlers/directChatHistoryHandler");
const roomCreateHandler = require("./socketHandlers/roomCreateHandler");
const roomJoinHandler = require("./socketHandlers/roomJoinHander");
const roomLeaveHandler = require("./socketHandlers/roomLeaveHandler");
const roomInitizalizeConnectionHandler = require("./socketHandlers/roomInitizalizeConnectionHandler");
const roomSignalingDataHandler = require("./socketHandlers/roomSignalingDataHandler");
const serverStore = require("./serverStore");
const CONSTANTS = require("./constants/Constants");

const registerSocketServer = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  serverStore.setSocketServerInstance(io);

  io.use(async (socket, next) => {
    await authSocket(socket, next);
  });

  const emitOnlineUsers = () => {
    const onlineUsers = serverStore.getOnlineUsers();
    io.emit(CONSTANTS.SOCKET_ACTIONS.ONLINE_USERS, {
      onlineUsers,
    });
  };

  io.on("connection", (socket) => {
    //new connection handler
    newConnectionHandler(socket, io);
    emitOnlineUsers();

    socket.on("disconnect", () => {
      disconnectHandler(socket);
    });

    socket.on(CONSTANTS.SOCKET_ACTIONS.SEND_DIRECT_MESSAGE, (data) => {
      directMessageHandler(socket, data);
    });

    socket.on(CONSTANTS.SOCKET_ACTIONS.DIRECT_CHAT_HISTORY, (data) => {
      directChatHistoryHandler(socket, data);
    });

    socket.on(CONSTANTS.SOCKET_ACTIONS.CREATE_ROOM, () => {
      roomCreateHandler(socket);
    });

    socket.on(CONSTANTS.SOCKET_ACTIONS.JOIN_ROOM, (data) => {
      roomJoinHandler(socket, data);
    });

    socket.on(CONSTANTS.SOCKET_ACTIONS.LEAVE_ROOM, (data) => {
      roomLeaveHandler(socket, data);
    });

    socket.on(CONSTANTS.SOCKET_ACTIONS.CONN_INIT, (data) => {
      roomInitizalizeConnectionHandler(socket, data);
    });

    socket.on(CONSTANTS.SOCKET_ACTIONS.CONN_SIGNAL, (data) => {
      roomSignalingDataHandler(socket, data);
    });
  });

  setInterval(() => {
    emitOnlineUsers();
  }, [1000 * 8]);
};

module.exports = {
  registerSocketServer,
};
