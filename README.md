cd termux-chat
cat > README.md << 'EOF'
# Termux Chat 💬

شات بسيط يشتغل داخل Termux باستخدام Node.js + Socket.IO
يدعم: رسائل نصية، صور، مقاطع صوتية.

## طريقة التشغيل
### طريقة التشغيل على Termux
### طريقة التشغيل على Termux
### طريقة التشغيل على Tطermux

```bash
pkg update && pkg upgrade -y
pkg install nodejs git -y
git clone https://github.com/alzymasd9-s/my-chat-app.git
cd my-chat-app
npm install
npm start
```bash
pkg update && pkg upgrade -y
pkg install nodejs git -y
git clone https://github.com/alzymasd9-s/my-chat-app.git
cd my-chat-app
npm install
npm start
```bash
pkg update && pkg upgrade -y
pkg install nodejs git -y
git clone https://github.com/alzymasd9-s/alzymasd9-s.git
cd alzymasd9-s
npm install
npm start

cd my-chat-app

mkdir -p public
cat > server.js << 'EOF'
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const multer = require('multer');
const fs = require('fs');
const app = express();
const server = http.createServer(app);
const io = new Server(server);
if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads');
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });
app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ url: '/uploads/' + req.file.filename });
});
io.on('connection', (socket) => {
  socket.on('chat message', (data) => io.emit('chat message', data));
});
const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Chat running on http://localhost:${PORT}`);
});
EOF

cat > package.json << 'EOF'
{
  "name": "my-chat-app",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {"start": "node server.js"},
  "dependencies": {"express": "^4.18.2","socket.io": "^4.7.2","multer": "^1.4.5"}
}
EOF

cat > public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="ar">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>شات Termux</title>
<style>
body{font-family:Arial;background:#ece5dd;margin:0}
#messages{list-style:none;padding:10px;margin-bottom:60px}
#messages li{background:white;padding:8px;margin:5px;border-radius:8px;max-width:70%}
#form{position:fixed;bottom:0;width:100%;display:flex;background:white;padding:5px}
#input{flex:1;padding:10px;border:none}
button{padding:10px;border:none;background:#128c7e;color:white}
img,audio{max-width:200px}
</style>
</head>
<body>
<ul id="messages"></ul>
<form id="form">
  <input id="input" autocomplete="off" placeholder="اكتب رسالتك...">
  <input type="file" id="file" accept="image/*,audio/*">
  <button>إرسال</button>
</form>
<script src
git add .
git commit -m "Add chat app files"
git push
