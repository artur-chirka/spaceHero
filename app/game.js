let canvas = document.getElementById("game");
let context = canvas.getContext("2d");

let bgImg = new Image();
bgImg.src = "../img/bgDarkPurple.png";

let shipImg = new Image();
shipImg.src = "../img/Ship.png";

let laserImg = new Image();
laserImg.src = "../img/laserGreen11.png";

let meteorImg1 = new Image();
meteorImg1.src = "../img/meteorBrown_big1.png";

let explImg 	= new Image();
explImg.src = '../img/boom.png';

let meteor = [];
let laser = [];
let expl = [];
let timer = 0;
let spaceShip = {
    x: 300,
    y: 300,
    animx: 0,
    animy: 0,
};



canvas.addEventListener("mousemove", function (event) {
    spaceShip.x = event.offsetX - 20;
    spaceShip.y = event.offsetY - 20;
});

meteor.push({
    x: 0,
    y: 0,
    dx: 1,
    dy: 1,
});

bgImg.onload = function () {
    game();
};

//!Главный игровой цикл
function game() {
    update();
    render();
    requestAnimationFrame(game);
}

function update() {
    timer++;

    //спавн астероидов
    if (timer % 10 == 0) {
        meteor.push({
            angle: 0,
            dxangle: Math.random() * 0.2 - 0.1,
            del: 0,
            x: Math.random() * 550,
            y: -50,
            dx: Math.random() * 2 - 1,
            dy: Math.random() * 2 + 1
        });

    }
    //выстрел
    if (timer % 30 == 0) {
        laser.push({
            x: spaceShip.x + 10,
            y: spaceShip.y,
            dx: 0,
            dy: -5.2
        });
        laser.push({
            x: spaceShip.x + 10,
            y: spaceShip.y,
            dx: 0.5,
            dy: -5
        });
        laser.push({
            x: spaceShip.x + 10,
            y: spaceShip.y,
            dx: -0.5,
            dy: -5
        });
    }

    //движение астероидов
    for (i in meteor) {
        meteor[i].x = meteor[i].x + meteor[i].dx;
        meteor[i].y = meteor[i].y + meteor[i].dy;
        meteor[i].angle = meteor[i].angle + meteor[i].dxangle;

        //граничные условия (коллайдер со стенками)
        if (meteor[i].x <= 0 || meteor[i].x >= 550) meteor[i].dx = -meteor[i].dx;
        if (meteor[i].y >= 650) meteor.splice(i, 1);

        //проверим каждый астероид на столкновение с каждой пулей
        for (j in laser) {

            if (Math.abs(meteor[i].x + 25 - laser[j].x - 15) < 50 && Math.abs(meteor[i].y - laser[j].y) < 25) {
                //произошло столкновение

                //спавн взрыва
                expl.push({
                    x: meteor[i].x - 25,
                    y: meteor[i].y - 25,
                    animx: 0,
                    animy: 0
                });

                //помечаем астероид на удаление
                meteor[i].del = 1;
                laser.splice(j, 1);
                break;
            }
        }
        //удаляем астероиды
        if (meteor[i].del == 1) meteor.splice(i, 1);
    }

    //двигаем пули
    for (i in laser) {
        laser[i].x = laser[i].x + laser[i].dx;
        laser[i].y = laser[i].y + laser[i].dy;

        if (laser[i].y < -30) laser.splice(i, 1);
    }

    //Анимация взрывов
    for (i in expl) {
        expl[i].animx = expl[i].animx + 0.5;
        if (expl[i].animx > 7) {
            expl[i].animy++;
            expl[i].animx = 0
        }
        if (expl[i].animy > 7)
            expl.splice(i, 1);
    }

    //анимация щита
    // spaceShip.animx = spaceShip.animx + 1;
    // if (spaceShip.animx > 4) {
    //     spaceShip.animy++;
    //     spaceShip.animx = 0
    // }
    // if (spaceShip.animy > 3) {
    //     spaceShip.animx = 0;
    //     spaceShip.animy = 0;
    // }
}

function render() {
    context.drawImage(bgImg, 0, 0, 600, 600);

    for (i in laser) context.drawImage(laserImg, laser[i].x, laser[i].y, 8, 50);

    context.drawImage(shipImg, spaceShip.x, spaceShip.y, 75, 75);

    for (i in meteor)
        context.drawImage(meteorImg1, meteor[i].x, meteor[i].y, 50, 50);

    for (i in expl)
        context.drawImage(explImg, 500 * Math.floor(expl[i].animx), 60 * Math.floor(expl[i].animy), 150, 150, expl[i].x, expl[i].y, 40, 40);
}