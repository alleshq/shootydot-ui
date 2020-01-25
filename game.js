const theme = {};
if (!localStorage.getItem("server")) localStorage.setItem("server", "http://localhost:8081");
const serverUrl = localStorage.getItem("server");
var gameData;

//Socket.io
const socket = io(serverUrl);
socket.on("data", data => {
    gameData = data;
});