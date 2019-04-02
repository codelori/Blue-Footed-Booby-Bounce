let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



let birdy = new Image();
birdy.src = "images/boob2.png"
let pipe1 =[];
let pipe2 = [];

function TopPole(x) {
    this.x = x;
    this.y = 0;
    this.dx = 5;
    this.width = 50;
    this.height = Math.floor(Math.random() * 200) + 200;
    this.draw = () => {
        ctx.fillStyle = '#5DCCFE';
        ctx.fillRect(this.x, this.y, this.width, this.height);
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
    this.width = 50;
    this.height = Math.floor(Math.random() * -200) - 200;
    this.draw = () => {
        ctx.fillStyle = '#5DCCFE';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.update = () => {
        this.x -= this.dx;
        this.draw();
    }
    
}

function Booby (){
    this.x = 100;
    this.y= 200;
    this.dy = 6;
    this.dy2 = 0;
    this.draw = () =>{
        ctx.drawImage(birdy, this.x, this.y);
    }
    this.update = () => {
        this.draw();
        this.y += this.dy;
        if(this.y < innerHeight){
            this.dy+= 1;
            this.y += this.dy;
        }else if(this.y > innerHeight){
            this.y = innerHeight - 150;
        }
    }
    this.lift = () =>{
        this.y -= this.dy * 4;
        this.update();
        console.log(`still here`);
    }
   

}

pipe1.push(new TopPole(1000));
pipe2.push(new BottomPole(1000));
let booby = new Booby();


const birdFall = () => { 
    requestAnimationFrame(birdFall) //makes the function recusrive
    ctx.clearRect(0,0,innerWidth,innerHeight);
    booby.update();
    pipe2[0].update();
    for(let i = 0; i < pipe1.length; i ++){
        pipe1[i].update();
        pipe2[i].update();
        // setTimeout(pipe1.push(new TopPole(1000)), 1000);
        console.log(pipe1.length);
    
    
    }

}
birdFall();


window.addEventListener('keydown', (e) => {
    booby.lift();
    console.log(e.keyCode);
});







