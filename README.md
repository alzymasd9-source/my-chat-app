# my-chat-app

شات بسيط يشتغل على Termux. تقدر ترسل رسائل نصية وصور وملفات صوتية بين الجوالات على نفس شبكة الواي فاي.

## طريقة التشغيل على Termux

```bash
pkg update && pkg upgrade -y
pkg install nodejs git -y
git clone https://github.com/alzymasd9-s/my-chat-app.git
cd my-chat-app
npm install
npm start
