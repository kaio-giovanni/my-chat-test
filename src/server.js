const express = require('express');
const path = require('path');
const socket = require('socket.io');

// App setup
const PORT = 3333;
const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('views', path.join(__dirname, '..', 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
    res.render('index.html');
});

const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

// Socket setup
const io = socket(server);

io.on('connection', (socket) => {
  console.log(`Made socket connection ${socket.id}`);

  let listMsg = [];

  socket.on("sendMessage", (data) => {
    const messageObject = {
      "id": socket.id,
      "author": data.author,
      "message": data.message
    }

    listMsg.push(messageObject);
    socket.broadcast.emit("receiveMessage", messageObject);
  });

});
