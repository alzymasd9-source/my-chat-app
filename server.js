const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

let messages = [];

io.on('connection', (socket) => {
    console.log('User connected');

    socket.emit('load_messages', messages);

    socket.on('send_message', (data) => {
        const msg = {
            user: data.user,
            text: data.text,
            time: new Date().toLocaleTimeString()
        };
        messages.push(msg);
        io.emit('new_message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

http.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
