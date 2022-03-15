let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let timeDomain = [];

let centX;
let centY;
let scale;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    centX = canvas.width / 2;
    centY = canvas.height / 2 + 800;

    scale = (canvas.width + canvas.height) / 2;
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'white';
}

function wallpaperAudioListener(audioArray) {
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    timeDomain.unshift(audioArray);
    if (timeDomain.length > 45) {
        timeDomain.pop();
    }

    for (let a = 0; a < timeDomain.length; ++a) {
        let length = timeDomain[a].length;
        let lineWidth = 20;
        let rowWidth = a * 40;
        let xOffset = (lineWidth * (length / 2))
        ctx.beginPath();
        for (let i = 0; i < length / 2; ++i) {
            let frequencyValue = Math.abs(clamp(timeDomain[a][i], -2, 2) * 120)
            let x = (lineWidth * i) - xOffset + centX;
            ctx.lineTo(x, centY - frequencyValue - rowWidth);
        }
        ctx.strokeStyle = 'blue';

        ctx.stroke();

        ctx.beginPath();
        for (let i = length / 2; i < length; ++i) {
            let frequencyValue = Math.abs(clamp(timeDomain[a][192 - i], -2, 2) * 120)
            let x = (lineWidth * i) - xOffset + centX;
            ctx.lineTo(x, centY - frequencyValue - rowWidth);
        }
        ctx.strokeStyle = 'red';
        ctx.stroke();
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