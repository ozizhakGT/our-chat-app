const app = require('express')();
const { port, newChatMessageEvent } = require('./startup/config');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});
const globalErrorHandler = require('./controllers/errorController');


require('./startup/cors')(app);
require('./startup/routes')(app);
app.use(globalErrorHandler);

io.on("connection", (socket) => {

  const { roomId="lobby" } = socket.handshake.query;
  socket.join(roomId);

  socket.on(newChatMessageEvent, (data) => {
    io.in(roomId).emit(newChatMessageEvent, data);
  });

  socket.on("disconnect", () => {
    socket.leave(roomId);
  });
});

server.listen(port, () => {
  console.log(`server successfully listening on port ${port}`);
});
