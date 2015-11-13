canvas = null;
ctx = null;
fps = null;

var posX = 0;
var posY = 0;
var velX = 150;
var velY = 150;
var sizeX = 80;
var sizeY = 40;
var gravityY = 900;
var paused = true;

var px = 750;
var py = 380;
var pv = 100;

var loose = false;


function GameTick(elapsed) {
    fps.update(elapsed);



    InputManager.padUpdate();



    if (InputManager.padPressed & InputManager.PAD.CANCEL)
        paused = !paused;

    if (!paused) {
        if ((InputManager.padPressed & InputManager.PAD.OK) && velY >= -10) {
            AudioManager.play("jump");
            velY = -1000;
        }


        posX += velX * elapsed;
        posY += (velY + 0.5 * gravityY * elapsed) * elapsed;
        velY += gravityY * elapsed;

        var bouncedX = false,
            bouncedY = false;
        if ((posX <= 0 && velX < 0) || (posX >= canvas.width - sizeX && velX > 0)) {
            velX = -velX;
            bouncedX = true;
        }
        if ((posY <= 0 && velY < 0) || (posY >= canvas.height - sizeY && velY > 0)) {
            velY = -velY * 0.7;
            bouncedY = true;
        }
        if (bouncedX)
            AudioManager.play("ping");
        if (bouncedY)
            AudioManager.play("bounce");
        px += elapsed * -55;
        if (px <= 0) {
            px = 750;
        }
        loose = false;

        var col1 = (posX > px) && (posX < (px + 50));
        var col2 = ((posX + 80) > px) && ((posX + 80) < (px + 50));
        var col3 = (px > posX) && (px < (posX + sizeX));
        var col4 = ((px + 50) > posX) && ((px + 50) < (posX + sizeX));

        if (posY + sizeY > py && (col1 || col2 || col3 || col4)) {
            loose = true;
        }
    }


    var grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, '#06B');
    grad.addColorStop(0.9, '#fff');
    grad.addColorStop(0.9, '#3C0');
    grad.addColorStop(1, '#fff');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeRect(posX, posY, sizeX, sizeY);
    ctx.fillStyle = "red";
    ctx.font = "10px sans-serif";
    ctx.fillText("SUMIU!", posX + 10, posY + 25);
    //
    ctx.fillStyle = "gray";
    ctx.fillRect(px, py, 50, 100);
    //
    if (loose) {
        ctx.fillStyle = "red";
    } else {
        ctx.fillStyle = "green";
    }
    ctx.arc(20, 20, 10, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.font = "22px sans-serif";
    ctx.fillText(paused ? "Paused" : "Running", 380, 25);
}

$(document).ready(function () {
    canvas = document.getElementById("screen");
    ctx = canvas.getContext("2d");
    fps = new FPSMeter("fpsmeter", document.getElementById("fpscontainer"));
    InputManager.connect(document, canvas);


    AudioManager.load({
        'ping': 'sound/guitar',
        'jump': 'sound/jump',
        'bounce': 'sound/bounce1'
    }, function () {

        InputManager.reset();
        GameLoopManager.run(GameTick);
    });
});