const express = require('express');

const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // react run
    origin: 'http://localhost:5173/twitter',
    methods: ['GET', 'POST'],
  },
});

// io.on means listen connection event
io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // declare event -  name:join_room
  // pass room ID through data
  // socket.on('join_room', (data) => {
  //   socket.join(data);
  //   console.log(`User with ID: ${socket.id} joined room: ${data}`);
  // });
  // 使用 io.on 監聽事件，用 socket.emit 方法傳送一個 receive_message事件
  socket.on('send_message', (data) => {
    // console.log(data)
    io.sockets.emit('receive_message', data);
    // only want to emit message to who in that room
    // socket.to(data.room).emit("receive_message", data);
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

server.listen(3001, () => {
  console.log('SERVER RUNNING');
});
