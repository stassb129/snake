const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d"); //

const ground = new Image()
ground.src = "img/ground.png"

const food = new Image()
food.src = "img/food.png"

let box = 32

let score = 0

let foodPos = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

let snake = []
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

let dir
const direction = (event) => {
    if (event.keyCode === 37 && dir !== "right")
        dir = "left"
    else if (event.keyCode === 38 && dir !== "down")
        dir = "up"
    if (event.keyCode === 39 && dir !== "left")
        dir = "right"
    else if (event.keyCode === 40 && dir !== "up")
        dir = "down"
}

const eatTail = (head, arr) =>{
    arr.forEach((e)=>{
        if(head.x === e.x && head.y === e.y){
            clearInterval(game)
        }
    })
}

document.addEventListener("keydown", direction)

const drawGame = () => {
    ctx.drawImage(ground, 0, 0)
    ctx.drawImage(food, foodPos.x, foodPos.y)

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "green" : "red"
        ctx.fillRect(snake[i].x, snake[i].y, box, box)
    }

    ctx.fillStyle = "white"
    ctx.font = "50px Arial"
    ctx.fillText(score, box * 2.5, box * 1.7)

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if (snakeX === foodPos.x && snakeY === foodPos.y) {
        score++
        foodPos = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
    } else {
        snake.pop()
    }

    if (snakeX < box || snakeX > box * 17 ||
        snakeY < 3 * box || snakeY > box * 17)
        clearInterval(game)

    dir === "left" ? snakeX -= box :
        dir === 'right' ? snakeX += box :
            dir === 'up' ? snakeY -= box :
                dir === 'down' ? snakeY += box : null

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    eatTail(newHead, snake)

    snake.unshift(newHead)
}

let game = setInterval(drawGame, 100)