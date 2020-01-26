if (!localStorage.getItem("server")) localStorage.setItem("server", "http://localhost:8081");
const serverUrl = localStorage.getItem("server");
var gameData;
var playerCredentials;
var me;

//Socket.io
const socket = io(serverUrl);
socket.on("data", data => {
    gameData = data;
    if (playerCredentials) {
        me = gameData.players[playerCredentials.id];
        if (!me) {
            //Death
            playerCredentials = undefined;
            gameMenu.classList.remove("hidden");
            return;
        };
        render();
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