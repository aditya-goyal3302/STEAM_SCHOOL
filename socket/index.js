const io = require("socket.io")(3005, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let activeusers = [];

const addUser = (userId, socketId) => {
  !activeusers.some((user) => user.userId === userId) &&
    activeusers.push({ userId, socketId });
};

const removeUser = (socketId) => {
  activeusers = activeusers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return activeusers.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("Connected.", socket.id);
  io.emit("message", "hello");

  socket.on("join", (userId) => {
    console.log("user joined", userId);
    addUser(userId, socket.id);
    io.emit("getUsers", activeusers);
  });

  socket.on(
    "sendMessage",
    ({ recieverid, senderid, createdAt, chatid, text }) => {
      const user = getUser(recieverid);
      console.log("in socket server, recieved a message", text);
      if (user) {
        io.to(user.socketId).emit("getMessage", {
          chatid,
          createdAt,
          senderid,
          text,
        });
      } else console.log("reciever not found online");
    }
  );

  socket.on("disconnect", () => {
    console.log("Disconnected!", socket.id);
    removeUser(socket.id);
    io.emit("getUsers", activeusers);
  });
});
