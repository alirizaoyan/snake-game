const canvas = document.getElementById("snake");
const context = canvas.getContext("2d");

// create the unit

const box= 32;

//load images

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// load audio files

const dead = new Audio();
const eat = new Audio();
const left = new Audio();
const right = new Audio();
const up = new Audio();
const down = new Audio();

dead.src ="audio/dead.mp3";
eat.src ="audio/eat.mp3";
left.src ="audio/left.mp3";
right.src ="audio/right.mp3";
up.src ="audio/up.mp3";
down.src ="audio/down.mp3";

//create the snake

let snake = [];
snake[0] ={
    x: 9*box,
    y: 10*box
};

//create the food

let food = {
    x: Math.floor(Math.random()*17+1)*box,
    y: Math.floor(Math.random()*15+3)*box
};

// create the score

let score = 0;

//control snake

let d;

document.addEventListener("keydown",direction);

function direction(event) {
    let key = event.keyCode;
    if (key == 37 && d != "RIGHT"){
        d= "LEFT";
        left.play();
    }else if (key == 38 && d != "DOWN"){
        d= "UP";
        up.play();
    }else if (key == 39 && d != "LEFT"){
        d= "RIGHT";
        right.play();
    }else if (key == 40 && d != "UP"){
        d= "DOWN";
        down.play();
    }
}

// check collision function

function collision(head,array) {
    for (let i=0; i<array.length; i++){
        if (head.x == array[i].x && head.y == array[i].y)
            return true;
    }
    return false;
}

// function draw

function draw() {
    context.drawImage(ground,0,0);
    
    for (let i=0; i<snake.length; i++){
        context.fillStyle = (i==0)? "red" : "yellow";
        context.fillRect(snake[i].x,snake[i].y,box,box);

        context.strokeStyle = "white";
        context.strokeRect(snake[i].x,snake[i].y,box,box);
    }

    context.drawImage(foodImg,food.x,food.y);

    // old head positon
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // if the sneak eats the food
    if (snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();

        food = {
            x: Math.floor(Math.random()*17+1)*box,
            y: Math.floor(Math.random()*15+3)*box
        };

        for (let i=0; i<snake.length; i++){
            if (food.x == snake[i].x && food.y == snake[i].y){
                food = {
                    x : Math.floor(Math.random()*17+1) * box,
                    y : Math.floor(Math.random()*15+3) * box
                }
            }

        }
    }else{

        //remove the tail
        snake.pop();
    }
    

    



    // which direction
    if (d == "LEFT") snakeX -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "UP") snakeY -= box;
    if (d == "DOWN") snakeY += box;

    // add a new head
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    // game over
    if (snakeX < box || snakeX>17*box || snakeY<3*box || snakeY>17*box
        || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
    }

    snake.unshift(newHead);

    context.fillStyle = "white";
    context.font = "45px Changa one";
    context.fillText(score,2*box,1.6*box);
}

// call draw function every 100 ms

let game = setInterval(draw,100);

function restart(){

    /* for (let i=0; i<=snake.length; i++){
         snake.pop();
     }
 */
    snake= [];
    score = 0;


    food = {
        x : Math.floor(Math.random()*17+1) * box,
        y : Math.floor(Math.random()*15+3) * box
    };

    snake[0] = {
        x : 9 * box,
        y : 10 * box
    };
    d = null;

    // ctx.clearRect(0,0,608,608);
    game = setInterval(draw,100);
}