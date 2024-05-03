//Define HTML elements
const board = document.getElementById('game-board');
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo')

//Define game variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = 'up';
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

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
// draw();

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

//Moving the Snake
function move() {
  const head = { ...snake[0] }; //the spread syntax creates a new object with same properties making a shallow copy  of the object
  switch (direction) {
    case 'up':
      head.y--;
      break;
    case 'down':
      head.y++;
      break;
    case 'left':
      head.x--;
      break;
    case 'right':
      head.x++;
      break;

  }

  snake.unshift(head);
  // snake.pop();

  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
    clearInterval(); //clear past interval
    gameInterval = setInterval(() => {
      move();
      draw();
    }, gameSpeedDelay)
  } else {
    snake.pop();
  }


}

//Test moving

// setInterval(() => {
//   move(); //move first
//   draw(); //then draw again new position
// }, 200)

//Start game function
function startGame() {
  gameStarted = true; //keep track of a running game
  instructionText.style.display = 'none';
  logo.style.display = 'none';

  gameInterval = setInterval(() => {
    move();
    draw();
  }, gameSpeedDelay)
}

//keyPress event listener
function handleKeyPress(event) {

  if (
    (!gameStarted && event.code === 'Space') ||
    (!gameStarted && event.key === ' ')
  ) {
    console.log('e', event)
    startGame();
  } else {
    switch (event.key) {
      case 'ArrowUp':
        direction = 'up'
        break;
      case 'ArrowDown':
        direction = 'down'
        break;
      case 'ArrowLeft':
        direction = 'left'
        break;
      case 'ArrowRight':
        direction = 'right'
        break;
    }
  }
}

document.addEventListener('keydown', handleKeyPress);