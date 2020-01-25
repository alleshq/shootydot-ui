const theme = {};
if (!localStorage.getItem("server")) localStorage.setItem("server", "http://localhost:3000");
const serverUrl = localStorage.getItem("server");
var gameData;

//Socket.io
const socket = io(serverUrl);
socket.on("data", data => {
    gameData = data;
});