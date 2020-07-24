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

let listClient = [];
let listRooms = [];

io.on("connection", (client) => {
  console.log(`User ${client.id} connected`);

  client.on("join", () =>{
    listClient.push(client.id);
    client.emit("joined", "You have connected to the server");
    client.broadcast.emit("joined", client.id + "Has joined to the server");
  });

  client.on("sendMessageAll", (args) => {
    client.broadcast.emit("receiveMessageAll", {
      "id": client.id,
      "author": args.author,
      "message": args.message
    });
  });

  client.on("createRoom", (args) => {
    client.join(args.room_name);
    listRooms.push(args.room_name);
    console.log("user "+ client.id + " has joined in to"+ args.room_name);
  });

  client.on("sendMessageToRoom", (args) => {
    client.broadcast.to(args.room_name).emit("receivePrivateMessage", {
      "id": client.id,
      "room_name": args.room_name,
      "author": args.author,
      "message": args.message
    });
  });

  client.on("disconnect", () => {
    listClient.pop(listClient[client.id]);
      
    io.emit("disconnected", client.id + " logout.");
  });

});