// Getting data from params
const params = new URLSearchParams(window.location.search);
username = params.get("username");
room = params.get("room");

//Getting html elements
let form = document.getElementById("form");

//Returns Message Object
const message = (username, text) => {
     return { username: username, text: text };
};

//Returns User Object
const user = (username, room) => {
     return { username: username, room: room };
};

//Displays a message in the chatbox
const outputMessage = (message) => {
     ulist = document.getElementById("messages");
     element = document.createElement("li");
     element.innerHTML = message.username + " : " + message.text;
     ulist.append(element);
     document.getElementById("chatMessage").value = "";
};

//Initialization of socket-client
const socket = io();

//Request to join the room
socket.emit("join-room", user(username, room));

//Get online users
socket.on("online-users", (users) => {
     console.log(users);
});

//Recieving a message from server
socket.on("server-message", (message) => {
     outputMessage(message);
});

//Recieving a chat message
socket.on("chat-message", (message) => {
     outputMessage(message);
});

//Sending a message to server
form.addEventListener("submit", (e) => {
     e.preventDefault();
     text = e.target.elements.chatMessage.value;
     socket.emit("chat-message", message(username, text));
});
