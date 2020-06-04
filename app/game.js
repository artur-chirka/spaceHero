let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

let meteor = [];
let laser = [];
let timer = 0;
let spaceShip = {
    x: 300,
    y: 300,
    animx: 0,
    animy: 0
};


let bgImg = new Image();
bgImg.src = '../images/bgDarkPurple.png';

let shipImg = new Image();
shipImg.src = '../images/Ship.png'

meteorImg1 = new Image();
meteorImg1.src = '../images/meteorBrown_big1.png';

laserImg = new Image();
laserImg.src = '../images/laserGreen11.png';

canvas.addEventListener('mousemove', function (event) {
    spaceShip.x = event.offsetX - 20;
    spaceShip.y = event.offsetY - 20;
});

// let meteorImg2 = new Image();
// meteorImg2.src = '../images/meteorBrown_big2.png';

// let meteorImg3 = new Image();
// meteorImg3.src = '../images/meteorBrown_big3.png';

// let meteorImg4 = new Image();
// meteorImg4.src = '../images/meteorBrown_big4.png';

meteor.push({
    x: 0,
    y: 0,
    dx: 1,
    dy: 1
});



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
    timer++;
    if (timer % 10 == 0) {
        meteor.push({
            x: Math.random() * 600,
            y: -50,
            dx: Math.random() * 2 - 1,
            dy: Math.random() * 1 + 1
        });
    }

    //*стрельба
    if (timer % 30 == 0) {
        laser.push({x:spaceShip.x + 10, y:spaceShip.y, dx:0, dy:-5.2});
        laser.push({x:spaceShip.x + 10, y:spaceShip.y, dx:0.5, dy:-5});
        laser.push({x:spaceShip.x + 10, y:spaceShip.y, dx:-0.5, dy:-5});
    }

    //*Физические свойства
    for (i in meteor) {
        meteor[i].x = meteor[i].x + meteor[i].dx;
        meteor[i].y = meteor[i].y + meteor[i].dy;

    }

    //*Границы
    if (meteor[i].x >= 550 || meteor[i].x < 0) meteor[i].dx = -meteor[i].dx;
    if (meteor[i].y >= 600) meteor.splice(i, 1);
}

function render() {
    context.drawImage(bgImg, 0, 0, 600, 600);
    context.drawImage(shipImg, spaceShip.x, spaceShip.y, 75, 75);
    
    for (i in laser) context.drawImage(laserImg, laser[i].x, laser[i].y, 8, 50);
    for (i in meteor) context.drawImage(meteorImg1, meteor[i].x, meteor[i].y, 50, 50);

}