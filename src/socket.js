// initialization of socket.io-client
import { io } from 'socket.io-client';
const URL = 'http://localhost:3001';
const socket = io(URL, { autoConnect: false, multiplex: false });

// console.log every time the socket event is fired!
socket.onAny((eventName, ...args) => {
  console.log(eventName, args);
});

export default socket;
