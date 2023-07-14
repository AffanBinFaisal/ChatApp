const params = new URLSearchParams(window.location.search);
username = params.get("username");

rooms = ["Room1", "Room2", "Room3"];
roomList = document.getElementById("room-list");
usernameHeading = document.getElementById("username");
usernameHeading.innerHTML = username;

for (i = 0; i < rooms.length; i++) {
     room = document.createElement("li");
     room.innerHTML =
          "<a href=/chat.html?username=" +
          username +
          "&room=" +
          rooms[i] +
          ">" +
          rooms[i] +
          "</a>";
     roomList.append(room);
}
