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
<<<<<<< HEAD
    origin: 'http://localhost:5174',
=======
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
>>>>>>> test-different-user
    methods: ['GET', 'POST'],
  },
});

// io.on means listen connection event
io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // 使用 io.on 監聽事件，用 socket.emit 方法傳送一個 receive_message事件
  socket.on('send_message', (data) => {
    console.log(data);
<<<<<<< HEAD
    io.emit('receive_message', data);
    // socket.broadcast.emit('receive_message', data);
=======
    socket.broadcast.emit('receive_message', data);
>>>>>>> test-different-user
  });

  // socket.broadcast.emit("hello", "world");

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

server.listen(3001, () => {
  console.log('SERVER RUNNING');
});
