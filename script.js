//Define HTML elements
const board = document.getElementById('game-board');

//Define game variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();

//Draw game, map , snake ,food
function draw() {
  board.innerHTML = '';
  drawSnake();
  drawFood();
}

//Draw snake 
function drawSnake() {
  snake.forEach((segment) => {
    const snakeElement = createGameElement('div', 'snake');
    setPosition(snakeElement, segment);
    board.appendChild(snakeElement);
  })
}

//Create a snake or food cube/div
function createGameElement(tag, className) {
  const element = document.createElement(tag)
  element.className = className;
  return element;
}

//set the position of snake or food

function setPosition(element, position) {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
}

//test
draw();

//Draw food function
function drawFood() {
  const foodElement = createGameElement('div', 'food');
  setPosition(foodElement, food);
  board.appendChild(foodElement);
}

//Generate food
function generateFood() {
  const x = Math.floor(Math.random() * gridSize) + 1; //{Math.floor: converts decimal numbers into natural numbers, Math.random: generates a random number greater than 0.0 less than 1.0}
  const y = Math.floor(Math.random() * gridSize) + 1;
  return { x, y };
}