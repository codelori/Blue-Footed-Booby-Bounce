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


function TopPole(x) {
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
    this.update = () => {
        this.x -= this.dx;
        this.draw();
    }
    this.repeat = () => {setInterval(this.update(),500)};
}

function BottomPole (x){
    this.x = x;
    this.y = 900;
    this.dx = 5;
    this.width = 70;
    this.height = Math.floor(Math.random() * -200)  -150;
    this.draw = () => {
        ctx.drawImage(bottomPipe, this.x, this.y, this.width, this.height)
        // ctx.fillStyle = '#5DCCFE';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.update = () => {
        this.x -= this.dx;
        this.draw();
    } 
}

function Booby (){
    this.x = 400;
    this.y = 0;
    this.gravity = 0.5;
    this.lift = -3;
    this.speed = 5;

    this.draw = () =>{
        ctx.drawImage(birdy, this.x, this.y, 100, 100);
    }

    this.update = () => {
        this.draw();
        this.y += this.speed
        if(this.y > 600){
            this.y = 600;
        }
    }
    this.moveUp = () =>{
        this.lift -= this.gravity;
        this.y += this.speed * this.lift;  
        console.log(this.y);
    }
}

let genPipes = () => {
    let newX = 100;
    for (let i=0; i< 7; i++){
        let x = innerWidth;
        pipe1.push(new TopPole(x+newX));
        pipe2.push(new BottomPole(x+newX));
        newX+=250;
        console.log(pipe1[i]);
    }; 
}
genPipes();

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

let booby = new Booby();

const animate = () => { 
    ctx.clearRect(0,0,innerWidth,innerHeight);
    movePipes();
    booby.update();

}
setInterval(animate, 20);
window.addEventListener('keypress', (e) => {
    booby.moveUp();
});











