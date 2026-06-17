const socket = io();

const messagesDiv = document.getElementById('messages');

socket.on('load_messages', (messages) => {
    messages.forEach(addMessage);
});

socket.on('new_message', (msg) => {
    addMessage(msg);
});

function sendMessage() {
    const user = document.getElementById('user').value;
    const text = document.getElementById('message').value;

    if (!user || !text) return;

    socket.emit('send_message', { user, text });
    document.getElementById('message').value = '';
}

function addMessage(msg) {
    const div = document.createElement('div');
    div.className = 'message';
    div.innerHTML = `<b>${msg.user}</b>: ${msg.text} <small>${msg.time}</small>`;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
