let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let circle_radius = 0;
let centX;
let centY;
let scale;

let circlepos = 0;
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    /*canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";*/
    centX = canvas.width / 2;
    centY = canvas.height / 2;

    scale = (canvas.width + canvas.height) / 2;
    circle_radius = canvas.height / 4
    ctx.lineWidth = (scale / 500) + 0.5;
    ctx.strokeStyle = 'white';
}

function wallpaperAudioListener(audioArray) {
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    let length = audioArray.length;
    let angle_increment = (2 * Math.PI / length);
    for (let i = 0; i < length / 2; ++i) {
        let angle = (0.5 * Math.PI) + (i * angle_increment);

        let frequency_value = Math.abs(clamp(audioArray[i], -2, 2) * 120)
        let cos_angle = Math.cos(angle);
        let sin_angle = Math.sin(angle);

        let min_radius = circle_radius - frequency_value;
        let min_posX = min_radius * cos_angle;
        let min_posY = min_radius * sin_angle;

        let max_radius = circle_radius + frequency_value;
        let max_posX = (2 + max_radius) * cos_angle;
        let max_posY = (2 + max_radius) * sin_angle;

        ctx.beginPath();
        ctx.moveTo(centX + min_posX, centY + min_posY);
        ctx.lineTo(centX + max_posX, centY + max_posY);
        ctx.closePath();

        //ctx.strokeStyle = 'red';
        ctx.stroke();
    }
    for (let i = length / 2; i < length; ++i) {
        let angle = (0.5 * Math.PI) + (i * angle_increment);

        let frequency_value = Math.abs(clamp(audioArray[191 - i], -2, 2) * 120)
        let cos_angle = Math.cos(angle);
        let sin_angle = Math.sin(angle);

        let min_radius = circle_radius - frequency_value;
        let min_posX = min_radius * cos_angle;
        let min_posY = min_radius * sin_angle;

        let max_radius = circle_radius + frequency_value;
        let max_posX = (2 + max_radius) * cos_angle;
        let max_posY = (2 + max_radius) * sin_angle;

        ctx.beginPath();
        ctx.moveTo(centX + min_posX, centY + min_posY);
        ctx.lineTo(centX + max_posX, centY + max_posY);
        ctx.closePath();

        //ctx.strokeStyle = 'blue';
        ctx.stroke();
        /*ctx.beginPath();
        ctx.moveTo(centX, centY - circle_radius + 20);
        ctx.lineTo(centX, centY + circle_radius - 20);
        ctx.closePath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.stroke();*/
    }
}

window.onload = function () {
    resize();
    window.wallpaperRegisterAudioListener(wallpaperAudioListener);
}

window.onresize = function () {
    resize();
}

function clamp(n, min, max) {
    return n > max ? max : n < min ? min : n;
}
