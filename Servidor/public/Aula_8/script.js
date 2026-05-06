let retangulo_1 = {
    x: 10,
    y: 10,
    w: 50,
    h: 50,
    color: "red"
};

let retangulo_2 = {
    x: 100,
    y: 100,
    w: 50,
    h: 50,
    color: "blue"
};

let retangulo_3 = {
    x: 200,
    y: 200,
    w: 50,
    h: 50,
    color: "green"
};


var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function desenha_retangulo(ret){
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.fillStyle = ret.color;
    ctx.fillRect(ret.x,ret.y,ret.w,ret.h);
    ctx.closePath()
}

function desenha_bola(){
    img = new Image()
    img.src = "ball.png"

    ctx.beginPath();
    ctx.drawImage(img, 200, 200, 100, 100);
    ctx.closePath();
}

let mov = 1
function desenhar(){
    ctx.clearRect(0,0,400,400)

    if(retangulo_1.x == 400-retangulo_1.w) { mov = -1 }
    if(retangulo_1.x == 0)                 { mov = 1 }

    retangulo_1.x = retangulo_1.x + mov

    desenha_retangulo(retangulo_1)
    desenha_retangulo(retangulo_2)
    desenha_retangulo(retangulo_3)
    desenha_bola();


    requestAnimationFrame(desenhar)
}

desenhar()


document.addEventListener("keydown", function(evento){
    var tecla = evento.key;
    console.log(tecla);

    var vel = 5;

    if(tecla == "ArrowUp")    { retangulo_2.y -= vel }
    if(tecla == "ArrowDown")  { retangulo_2.y += vel }
    if(tecla == "ArrowLeft")  { retangulo_2.x -= vel }
    if(tecla == "ArrowRight") { retangulo_2.x += vel }
})

document.addEventListener("mousemove", function(evento){
    var rect = canvas.getBoundingClientRect();
    var x_mouse = evento.clientX - rect.left;
    var y_mouse = evento.clientY - rect.top;
    console.log(x_mouse, y_mouse);

    retangulo_3.x = x_mouse;
    retangulo_3.y = y_mouse;

})
