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
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
    methods: ['GET', 'POST'],
  },
});

// io.on means listen connection event
io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('join_chat', (data) => {
    io.emit('user_join', data);
  });

  // 使用 io.on 監聽事件，用 socket.emit 方法傳送一個 receive_message事件
  socket.on('send_message', (data) => {
    console.log(data);
    socket.broadcast.emit('receive_message', data);
  });

  socket.on('leave_chat', (data) => {
    console.log(data);
    io.emit('user_leave', data);
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

server.listen(3001, () => {
  console.log('SERVER RUNNING');
});
