cd termux-chat
cat > README.md << 'EOF'
# Termux Chat 💬

شات بسيط يشتغل داخل Termux باستخدام Node.js + Socket.IO
يدعم: رسائل نصية، صور، مقاطع صوتية.

## طريقة التشغيل

```bash
pkg update && pkg upgrade -y
pkg install nodejs git -y
git clone https://github.com/alzymasd9-s/alzymasd9-s.git
cd alzymasd9-s
npm install
npm start
