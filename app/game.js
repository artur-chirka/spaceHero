let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

let bgImg = new Image();
bgImg.src = '../images/bgDarkPurple.png';

bgImg.onload = function () {
    game()
}

//!Главный игровой цикл
function game() {
    update();
    render();
    requestAnimationFrame(game);
}

function update() {

}

function render() {
    context.drawImage(bgImg, 0, 0, 600, 600);
}