let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let birdy = new Image();
birdy.src = "images/boob2.png"

let topPipe = new Image();
topPipe.src = "images/pipeNorth.png";

let bottomPipe = new Image();
bottomPipe.src = "images/pipeSouth.png";

let pipe1 =[];
let pipe2 = [];

let score = 0;
let scoreElement = document.querySelector('.score');
let scoreText = scoreElement.innerHTML;


function Booby (){
    this.x = 400;
    this.y = 0;
    this.gravity = 0.5;
    this.lift = -3;
    this.speed = 8;
    this.width = 80;
    this.height = 80;

    this.draw = () =>{
        ctx.drawImage(birdy, this.x, this.y, this.width, this.height);
    }
    this.update = () => {
        this.draw();
        this.y += this.speed
        if(this.y > 650){
            this.y = 650;
        }
    }
    this.moveUp = () =>{
    this.lift -= this.gravity;

        this.y += this.speed * this.lift;  
    }
}
let booby = new Booby();

function TopPipe(x) {
    this.x = x;
    this.y = 0;
    this.dx = 5;
    this.width = 70;
    this.height = Math.floor(Math.random() * 200) + 150;
    this.draw = () => {
        ctx.drawImage(topPipe, this.x, this.y, this.width, this.height);
        // ctx.fillStyle = '#5DCCFE';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.collision = () => {
        if(booby.x + booby.width - 10 >= this.x && booby.x + 10 <= this.x + this.width){
            if(booby.y <= this.y + this.height){
                clearInterval(playGame);
                return true;
            }
        }
    }
    // this.score = () =>{
    //     if(booby.x + booby.width )

    // }
    this.update = () => {
        this.x -= this.dx;
        this.draw(); 
        this.collision();
    }
}

function BottomPipe (x){
    this.x = x;
    this.y = 900;
    this.dx = 5;
    this.width = 70;
    this.height = Math.floor(Math.random() * -200)  -150;
    this.draw = () => {
        ctx.drawImage(bottomPipe, this.x, this.y, this.width, this.height)
    }
    this.collision = () => {
        if(booby.x + booby.width >= this.x && booby.x <= this.x + this.width){
            if(booby.y + booby.height >= this.y + this.height){
                clearInterval(playGame);
                return true;
            }
        }
    }
    this.update = () => {
        this.x -= this.dx;
        this.draw();
        this.collision();
    }
}


let generatePipes = () => {
    let newX = 100;
    for (let i=0; i< 7; i++){
        let x = innerWidth;
        pipe1.push(new TopPipe(x+newX));
        pipe2.push(new BottomPipe(x+newX));
        newX+=250;
    }; 
}
generatePipes();

let movePipes = () =>{
    for (let i = 0; i < pipe1.length; i++){
        pipe1[i].update();
        pipe2[i].update();
        if (pipe1[i].x < -100){
            pipe1[i].x = innerWidth;
            pipe1[i].height = Math.floor(Math.random() * 200) + 150
        }
        if (pipe2[i].x < -100){
            pipe2[i].x = innerWidth;
            pipe2[i].height = Math.floor(Math.random() * -200)  -150;
        }
    }
}

const game = () => { 
    ctx.clearRect(0,0,innerWidth,innerHeight);
    movePipes();
    booby.update();
}
let playGame = setInterval(game, 20);

window.addEventListener('keydown', (e) => {
    if (e.keyCode === 32){
        booby.moveUp();
    }
});











