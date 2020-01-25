const theme = {};
const serverUrl = "http://localhost:8081";

//Socket.io
const socket = io(serverUrl);
socket.on("data", data => {
    document.body.innerText = JSON.stringify(data);
});