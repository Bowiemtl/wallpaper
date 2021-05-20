var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

}

const animate = (audioData) => {
    window.requestAnimationFrame(animate);

    ctx.clearRect(0,0, innerWidth, innerHeight);

    ctx.strokeStyle = "afa34a3";
    ctx.beginPath();
    ctx.lineTo(5, 5);
    ctx.lineTo(15, 5);



    ctx.lineTo(5, 15);
    ctx.beginPath();
    for(let i = 0; i < audioData.length; i++){
        let posX = audioData[i] * Math.sin(i * (360 / length));

        let posY = audioData[i] * Math.cos(i * (360 / length));
        ctx.lineTo(posX, posY);
    }
    ctx.stroke();
}

window.onload = function () {
    resize();
    window.requestAnimationFrame(animate());
}
window.onresize = function () {
    resize();
}

window.wallpaperRegisterAudioListener((audioData) => {
    let average = 0;
    for (let i = 0; i < audioData.length; i++){
        average += audioData[i];
    }
    average / audioData.length;
    GLOBE_RADIUS = average * 10;
    animate(audioData);
});



/*window.wallpaperRegisterAudioListener((audioData) => {
});
window.wallpaperPropertyListener = {
    applyUserProperties: function (properties) {
        /!*if (properties.something == ""){

        }*!/
    }
}

ctx.fillRect( 50, 100, 40, 40);

ctx.beginPath();
ctx.arc(50, 50, 30, 0, Math.PI * 2, false);
ctx.strokeStyle = "afa34a3";
ctx.stroke();*/