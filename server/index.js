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

  // data: currentUser
  socket.on('join_chat', (data) => {
    io.emit('user_join', data);
  });

  // data: messageData 訊息內容
  // const messageData = {
  //   type: 'message',
  //   author: currentUser,
  //   message: currentMessage,
  //   time: `${new Date(Date.now()).getHours()}:${new Date(
  //     Date.now()
  //   ).getMinutes()}`,
  // };
  socket.on('send_message', (data) => {
    console.log(data);
    socket.broadcast.emit('receive_message', data);
  });

  // data: currentUser
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
