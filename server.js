const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// خلي مجلد public يكون عام
app.use(express.static('public'));

// قائمة المستخدمين المتصلين
let onlineUsers = [];

io.on('connection', (socket) => {
  console.log('مستخدم اتصل');

  // لما مستخدم يدخل
  socket.on('user join', (user) => {
    socket.username = user.username;
    socket.gender = user.gender;
    onlineUsers.push({ id: socket.id, username: user.username, gender: user.gender });
    
    // أرسل لكل الناس قائمة المتصلين
    io.emit('user list', onlineUsers);
    socket.broadcast.emit('system message', `${user.username} دخل الدردشة`);
  });

  // لما يرسل رسالة
  socket.on('chat message', (msg) => {
    io.emit('chat message', {
      user: socket.username,
      gender: socket.gender,
      message: msg.message,
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    });
  });

  // لما يخرج
  socket.on('disconnect', () => {
    onlineUsers = onlineUsers.filter(u => u.id !== socket.id);
    io.emit('user list', onlineUsers);
    if (socket.username) {
      socket.broadcast.emit('system message', `${socket.username} خرج من الدردشة`);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`السيرفر شغال على المنفذ ${PORT}`);
});
