const theme = {};
if (!localStorage.getItem("server")) localStorage.setItem("server", "http://localhost:8081");
const serverUrl = localStorage.getItem("server");
var gameData;
var playerCredentials;
var player;

//Socket.io
const socket = io(serverUrl);
socket.on("data", data => {
    gameData = data;
    if (playerCredentials) {
        player = gameData.players[playerCredentials.id];
        console.log(player);
    }
});

//Start Game
const startGame = () => {
    //Create Player
    fetch(`${serverUrl}/join`, {
        method: "post"
    }).then(res => {
        if (res.status === 200) {
            res.json().then(body => {
                //Store Credentials
                playerCredentials = body;

                //Hide Menu
                gameMenu.classList.add("hidden");
            });
        }
    }).catch(() => {});
};