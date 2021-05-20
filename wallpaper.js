var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

let volumes = {};

for (let i = 0; i < 128; i++) {
    volumes[i] = 0;
}

function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
}

var detail = 20;
const draw = function () {
    window.requestAnimationFrame(draw);
    ctx.clearRect(0,0, innerWidth, innerHeight);

    ctx.lineWidth = 2;
    var baseX = canvas.width / 2;
    var baseY = canvas.height / 2;
    for (let j = 0; j < 1; j++) {
        ctx.beginPath();
        //for(let i = volumes.length - 1; i >= 0; i--){
        var length =  volumes.length;


        for(let i = 0; i < length; i++){
            var angle = 90 - (i * (2 * Math.PI / length));
            var radius = volumes[i] * 200 + 200;

            let posX = radius * Math.cos(angle);
            let posY = radius * Math.sin(angle);

            var next_angle = 90 - ((i + 1) * (2 * Math.PI / length));
            var next_radius = volumes[i + 1] * (j * 100) + 200;

            let next_posX = next_radius * Math.cos(next_angle);
            let next_posY = next_radius * Math.sin(next_angle);

            ctx.quadraticCurveTo(posX + baseX, posY + baseY, next_posX + baseX, next_posY + baseY);

            //ctx.lineTo(posX + baseX, posY + baseY);

            var r, g, b = 0;
            r = i*2;
            g = i*2;
            b = i*2;
            ctx.strokeStyle = rgbToHex(r, g, b).toString();
        }
        //ctx.quadraticCurveTo(points[i].x, points[i].y, points[i+1].x,points[i+1].y);
        ctx.closePath();
        ctx.fillStyle = 'white'
        ctx.fill("nonzero");
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(100, 75, j * 100, 0, 2 * Math.PI);
        ctx.fillStyle = 'black'
        ctx.stroke();
        ctx.fill("nonzero");

    }
}

window.onload = function () {
    resize();
    window.requestAnimationFrame(draw);
    draw();
}

window.onresize = function () {
    resize();
}

window.wallpaperRegisterAudioListener((audioData) => {
    volumes = audioData;
});

function rgbToHex(r, g, b) {
    return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}