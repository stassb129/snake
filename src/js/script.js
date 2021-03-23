//Определяем канвас и контекст
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d");

//Добавляем img
const ground = new Image()
ground.src = "img/ground.png"

const food = new Image()
food.src = "img/food.png"

//Размер квадрата на поле
let box = 32
//Счёт
let score = 0
//Позиция еды
let foodPos = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}
//Массив змейки и определение позиции её головы
let snake = []
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

//Управление змейкой
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

//Функция самосъедения
const eatTail = (head, arr) => {
    arr.forEach(e => {
        if (head.x === e.x && head.y === e.y) {
            clearInterval(game)
        }
    })
}

//Слушатель на управление
document.addEventListener("keydown", direction)

//Функция отрисовки
const drawGame = () => {
    //Отрисовка земли и еды
    ctx.drawImage(ground, 0, 0)
    ctx.drawImage(food, foodPos.x, foodPos.y)

    //Отрисовка массива змейки
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "green" : "red"
        ctx.fillRect(snake[i].x, snake[i].y, box, box)
    }
    //Отрисовка Score
    ctx.fillStyle = "white"
    ctx.font = "50px Arial"
    ctx.fillText(score, box * 2.5, box * 1.7)

    //Передача координат головы
    let snakeX = snake[0].x
    let snakeY = snake[0].y

    //Проверка на совпадение координат головы с едой
    if (snakeX === foodPos.x && snakeY === foodPos.y) {
        score++
        foodPos = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
    } else {
        //Если не совпадает, убираем последний элемент
        snake.pop()
    }

    //Проверка на совпадение головы с гранями карты
    if (snakeX < box || snakeX > box * 17 ||
        snakeY < 3 * box || snakeY > box * 17)
        clearInterval(game)

    //Реализованное управление. Зависит от переменной dir
    dir === "left" ? snakeX -= box :
        dir === 'right' ? snakeX += box :
            dir === 'up' ? snakeY -= box :
                dir === 'down' ? snakeY += box : null

    //Получаем новые координаты головы
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    //Используем функцию самосъедания
    eatTail(newHead, snake)
    //Добавляем новый первый элемент в змейку
    snake.unshift(newHead)
}

//Отрисовка каждые 100мл с
let game = setInterval(drawGame, 100)