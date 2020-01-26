if (!localStorage.getItem("server")) localStorage.setItem("server", "http://localhost:8081");
const serverUrl = localStorage.getItem("server");
const token = localStorage.getItem("token");
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
            shooting = false;
            gameMenu.classList.remove("hidden");
            return;
        };
        render();
    }
});

//Player Action
const playerAction = (action, param) => {
    if (!playerCredentials) return;
    socket.emit("action", {
        id: playerCredentials.id,
        secret: playerCredentials.secret,
        action,
        param
    });
};

//Start Game
const startGame = () => {
    if (!token) return location.href = "/auth";

    //Create Player
    fetch(`${serverUrl}/join`, {
        method: "post",
        headers: {
            authorization: token
        }
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