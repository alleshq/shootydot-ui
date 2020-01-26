const playerSize = 20;
const starSize = 10;
const bulletSize = 5;
const distanceMultiplier = 5;
const theme = {
    bg: "#2c3e50",
    player: "#e74c3c",
    playerInfected: "#2ecc71",
    playerVip: "#6029ad",
    text: "#95a5a6",
    speedBar: "#27ae60",
    speedBarBg: "#95a5a6",
    speedBarActive: "#e67e22",
    star: "#bdc3c7",
    bullet: "#f39c12",
    font: "20px 'KoHo', sans-serif"
};

const render = () => {
    canvas.height = innerHeight;
    canvas.width = innerWidth;
    const gameScreen = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    //Background
    gameScreen.fillStyle = theme.bg;
    gameScreen.fillRect(0, 0, canvas.width, canvas.height);

    //Draw Stars
    gameScreen.fillStyle = theme.star;
    gameData.stars.forEach(star => {
        const relativeX = centerX - ((me.x - star.x) * distanceMultiplier);
        const relativeY = centerY - ((me.y - star.y) * distanceMultiplier);
        gameScreen.beginPath();
        gameScreen.arc(relativeX - playerSize / 2, relativeY - starSize / 2, starSize, 0, Math.PI * 2);
        gameScreen.fill();
    });

    //Draw self
    gameScreen.beginPath();
    gameScreen.fillStyle = me.plague ? theme.playerInfected : theme.player;
    gameScreen.arc(centerX - playerSize / 2, centerY - playerSize / 2, playerSize, 0, Math.PI * 2);
    gameScreen.fill();

    //Draw other players
    Object.keys(gameData.players).forEach(id => {
        if (id === playerCredentials.id) return; //Don't render self
        const player = gameData.players[id];
        gameScreen.fillStyle = currentPlayer.plague ? theme.playerInfected : (currentPlayer.vip ? theme.playerVip : theme.player);
        const relativeX = centerX - ((me.x - player.x) * distanceMultiplier);
        const relativeY = centerY - ((me.y - player.y) * distanceMultiplier);
        gameScreen.beginPath();
        gameScreen.arc(relativeX - playerSize / 2, relativeY - playerSize / 2, playerSize, 0, Math.PI * 2);
        gameScreen.fill();
        gameScreen.fillStyle = theme.text;
        gameScreen.fillText(`${player.name} [${player.score}]`, relativeX + playerSize, relativeY);
    });

    //Draw Bullets
    //gamescreen.fillStyle = theme.bullet;
    //for (var i = 0; i < gamedata.bullets.length; i++) {
    //var currentBullet = gamedata.bullets[i];
    //var xoncanvas = centerx - ((myPlayerData.x - currentBullet.x) * distanceMultiplier);
    //var yoncanvas = centery - ((myPlayerData.y - currentBullet.y) * distanceMultiplier);
    //gamescreen.beginPath();
    //gamescreen.arc(xoncanvas - bulletSize / 2, yoncanvas - bulletSize / 2, bulletSize, 0, Math.PI * 2);
    //gamescreen.fill();
    //}

    //Speed Bar
    gameScreen.fillStyle = theme.speedBarBg;
    gameScreen.fillRect(centerX - 100, canvas.height - 80, 200, 40);
    gameScreen.fillStyle = me.speedBoost.active ? theme.speedBarActive : theme.speedBar;
    gameScreen.fillRect(centerX - 100, canvas.height - 80, me.speedBoost.full * 2, 40);

    //Text Overlay Config
    var textOverlays = [
    'x: ' + Math.floor(me.x),
    'y: ' + Math.floor(me.y),
    'score: ' + me.score,
    'players online: ' + Object.keys(gameData.players).length
    ];

    //Text Overlays
    gameScreen.fillStyle = theme.text;
    gameScreen.font = theme.font;
    for (var i = 0; i < textOverlays.length; i++) {
        gameScreen.fillText(textOverlays[i], 20, i * 30 + 30);
    }
}