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
let finalScore = document.querySelector('.score2');

let gameButton = document.querySelector(".start-game");
let startPage = document.querySelector(".background1");
let gameOver = document.querySelector('.background2');
let playAgain = document.querySelector('.replay');

let keepScore = () => {
    score += 1;
    scoreElement.innerHTML = `Score: ${score}`;
}

function Booby (){
    this.x = 400;
    this.y = 0;
    this.friction = 0.99;
    this.speed = 4;
    this.width = 80;
    this.height = 80;
    this.draw = () =>{
        ctx.drawImage(birdy, this.x, this.y, this.width, this.height);
    }
    this.update = () => {
        this.draw();
        this.y += this.speed
        if(this.y > 670){
            this.y = 670;
        }
    }
    this.move = (e) =>{
        if(e.type === "keydown"){
            this.y -= this.speed * 10;
            this.speed *= this.friction;
        }
        if(e.type ==="keyup"){
            this.speed = 5;
            this.friction = 0.99;
        }
    }
}
let booby = new Booby();

function TopPipe(x) {
    this.x = x;
    this.y = 0;
    this.dx = 5;
    this.width = 70;
    this.height = Math.floor(Math.random() * 200) + 175;
    this.draw = () => {
        ctx.drawImage(topPipe, this.x, this.y, this.width, this.height);
    }
    this.collision = () => {
        if(booby.x + booby.width - 10 >= this.x && booby.x + 10 <= this.x + this.width){
            if(booby.y +10 <= this.y + this.height){
                clearInterval(playGame);
                booby.className = 'bird-death-spin';
                finalScore.innerHTML = `Final Score: ${score}`
                gameOver.style.display = 'block';
                scoreElement.style.display = "none";
            }
        }
    }
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
    this.height = Math.floor(Math.random() * -200)  -175;
    this.draw = () => {
        ctx.drawImage(bottomPipe, this.x, this.y, this.width, this.height)
    }
    this.collision = () => {
        if(booby.x + booby.width -10 >= this.x && booby.x + 10 <= this.x + this.width){
            if(booby.y + booby.height -10 >= this.y + this.height){
                clearInterval(playGame);
                gameOver.style.display = 'block';
                finalScore.innerHTML = `Final Score: ${score}`
                scoreElement.style.display = "none";
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
            pipe1[i].height = Math.floor(Math.random() * 225) + 175
        }
        if (pipe2[i].x < -100){
            pipe2[i].x = innerWidth;
            pipe2[i].height = Math.floor(Math.random() * -225)  -175;
        }
    }
}
const game = () => { 
    ctx.clearRect(0,0,innerWidth,innerHeight);
    movePipes();
    booby.update();
    keepScore();

}
let playGame; 
 
let playGameHolder = () =>{
    playGame = setInterval(game, 20);
};

window.addEventListener('keydown', booby.move);
window.addEventListener('keyup', booby.move);

gameButton.addEventListener('click', ()=>{
    playGameHolder();
    startPage.style.display = "none";
    scoreElement.style.display = "block";
});

let resetPipes = () =>{
    pipe1 = [];
    pipe2 = [];
}

playAgain.addEventListener('click', ()=>{
    booby.x = 400;
    booby.y = 0;
    resetPipes();
    generatePipes();
    playGameHolder();
    score = 0;
    gameOver.style.display = "none";
    scoreElement.style.display = "block";

});

let infoButton = document.querySelector('.info');
let infoModal = document.querySelector('.background3');
infoButton.addEventListener('click', ()=>{
    infoModal.style.display = "block";
})

let closeButton = document.querySelector('.close');
closeButton.addEventListener('click', ()=>{
    infoModal.style.display = "none";
})

let secondPlay = document.querySelector('.play');
secondPlay.addEventListener('click', ()=>{
    playGameHolder();
    startPage.style.display = "none";
    infoModal.style.display = "none";
    scoreElement.style.display = "block";
})












