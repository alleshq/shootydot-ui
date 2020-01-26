//Change direction
canvas.onmousemove = e => {
    var x1 = window.innerWidth / 2; //Center
    var y1 = window.innerHeight / 2; //Center
    var x2 = e.clientX;
    var y2 = e.clientY;
    var dx = x2 - x1;
    var dy = y2 - y1;
    var direction = Math.atan2(dy, dx)*(180/Math.PI) + 90;
    if (direction < 0) direction = direction + 360;
    direction = Math.floor(direction);
    playerAction("changeDirection", direction);
};

//Speed boost
canvas.oncontextmenu = e => {
    e.preventDefault();
    playerAction("speedBoost");
};

//Shooting
var shooting = false;
canvas.onmousedown = function (e) {
    if (e.button === 0) shooting = true;
};
canvas.onmouseup = function (e) {
    if (e.button === 0) shooting = false;
};
setInterval(function () {
    if (shooting) playerAction("shoot");
}, 100);