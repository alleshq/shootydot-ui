const theme = {};
const serverUrl = "http://localhost:8081";
var gameData;

//Socket.io
const socket = io(serverUrl);
socket.on("data", data => {
    gameData = data;
});