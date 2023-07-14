//Importing modules
const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const message = require("./public/js/message");
const {
     userJoin,
     getCurrentUser,
     userLeave,
     getRoomUsers,
} = require("./public/js/user");

//Initialiaztion
const app = express();
app.use(express.static(path.join(__dirname, "public")));
const server = http.createServer(app);
const io = socketio(server);

//Connection
io.on("connection", (socket) => {
     //Recieving user's request to join a room
     socket.on("join-room", (user) => {
          userJoin(socket.id, user.username, user.room);
          socket.join(user.room);
          socket.emit(
               "server-message",
               message("Bot Ali", "Welcome to ChatApp")
          );
          socket.broadcast
               .to(user.room)
               .emit(
                    "server-message",
                    message("Bot Jon", user.username + " has joined the chat")
               );
          users = getRoomUsers(user.room);
          socket.emit("online-users", users);
     });

     //Recieving a chat message
     socket.on("chat-message", (message) => {
          user = getCurrentUser(socket.id);
          io.to(user.room).emit("chat-message", message);
     });

     //User disconnecting
     socket.on("disconnect", () => {
          user = getCurrentUser(socket.id);
          userLeave(socket.id);
          io.to(user.room).emit(
               "server-message",
               message("Bot Jon", user.username + " has left the chat")
          );
          users = getRoomUsers(user.room);
          socket.emit("online-users", users);
     });
});

//Server Listening
server.listen(3001, () => {
     console.log("Server running on port 3001.");
});

//Test Links
//http://localhost:3001/chat.html?username=Malhan&room=room1
//http://localhost:3001/chat.html?username=Affan&room=room1
//http://localhost:3001/chat.html?username=Usman&room=room2
//http://localhost:3001/chat.html?username=Ali&room=room2
