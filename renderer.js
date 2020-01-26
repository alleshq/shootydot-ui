const playerSize = 20;
const starSize = 10;
const bulletSize = 5;
const distanceMultiplier = 3;
var zoom = 1;
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
    font: "'KoHo', sans-serif"
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
        const relativeX = centerX - ((me.x - star.x) * distanceMultiplier * zoom);
        const relativeY = centerY - ((me.y - star.y) * distanceMultiplier * zoom);
        gameScreen.beginPath();
        gameScreen.arc(relativeX - (starSize * zoom) / 2, relativeY - (starSize * zoom) / 2, starSize * zoom, 0, Math.PI * 2);
        gameScreen.fill();
    });

    //Draw self
    gameScreen.beginPath();
    gameScreen.fillStyle = me.plague ? theme.playerInfected : theme.player;
    gameScreen.arc(centerX - (playerSize * zoom) / 2, centerY - (playerSize * zoom) / 2, playerSize * zoom, 0, Math.PI * 2);
    gameScreen.fill();

    //Draw other players
    Object.keys(gameData.players).forEach(id => {
        if (id === playerCredentials.id) return; //Don't render self
        const player = gameData.players[id];
        gameScreen.fillStyle = me.plague ? theme.playerInfected : (me.vip ? theme.playerVip : theme.player);
        const relativeX = centerX - ((me.x - player.x) * distanceMultiplier * zoom);
        const relativeY = centerY - ((me.y - player.y) * distanceMultiplier * zoom);
        gameScreen.beginPath();
        gameScreen.arc(relativeX - (playerSize * zoom) / 2, relativeY - (playerSize * zoom) / 2, playerSize * zoom, 0, Math.PI * 2);
        gameScreen.fill();
        gameScreen.fillStyle = theme.text;
        gameScreen.font = `${20 * zoom}px ${theme.font}`;
        gameScreen.fillText(`${player.name} [${player.score}]`, relativeX + (playerSize * zoom), relativeY);
    });

    //Draw Bullets
    gameScreen.fillStyle = theme.bullet;
    gameData.bullets.forEach(bullet => {
        const relativeX = centerX - ((me.x - bullet.x) * distanceMultiplier * zoom);
        const relativeY = centerY - ((me.y - bullet.y) * distanceMultiplier * zoom);
        gameScreen.beginPath();
        gameScreen.arc(relativeX - (bulletSize * zoom) / 2, relativeY - (bulletSize * zoom) / 2, bulletSize * zoom, 0, Math.PI * 2);
        gameScreen.fill();
    });

    //Speed Bar
    gameScreen.fillStyle = theme.speedBarBg;
    gameScreen.fillRect(centerX - 100, canvas.height - 80, 200, 40);
    gameScreen.fillStyle = me.speedBoost.active ? theme.speedBarActive : theme.speedBar;
    gameScreen.fillRect(centerX - 100, canvas.height - 80, me.speedBoost.full * 2, 40);

    //Text Overlay Config
    var textOverlays = [
    `x: ${Math.floor(me.x)}`,
    `y: ${Math.floor(me.y)}`,
    `score: ${me.score}`,
    `players online: ${Object.keys(gameData.players).length}`
    ];

    //Text Overlays
    gameScreen.fillStyle = theme.text;
    gameScreen.font = `20px ${theme.font}`;
    for (var i = 0; i < textOverlays.length; i++) {
        gameScreen.fillText(textOverlays[i], 20, i * 30 + 30);
    }
}