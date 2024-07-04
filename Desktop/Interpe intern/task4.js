const grid = document.getElementById('grid');
const playerDisplay = document.getElementById('player');
const resetBtn = document.getElementById('reset-btn');

let player = 1; // 1 for red, 2 for yellow
let gameOver = false;
let board = [];

// Create a 2D array to represent the game board
for (let i = 0; i < 6; i++) {
  board[i] = new Array(7).fill(0);
}

// Function to create the game board
function createBoard() {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('button');
      cell.addEventListener('click', handleClick.bind(null, j));
      grid.appendChild(cell);
    }
  }
}

// Function to handle player clicks
function handleClick(col) {
  if (gameOver) return;

  let row = 5;
  while (row >= 0 && board[row][col] !== 0) {
    row--;
  }

  if (row === -1) return; // Column is full

  board[row][col] = player;
  renderBoard();

  // Check for winner
  if (checkWin(row, col)) {
    gameOver = true;
    playerDisplay.textContent = `Player ${player} Wins!`;
    return;
  }

  // Switch player
  player = player === 1 ? 2 : 1;
  playerDisplay.textContent = `Player ${player}'s Turn`;
}

// Function to render the game board visually
function renderBoard() {
  const cells = grid.querySelectorAll('button');
  cells.forEach((cell, index) => {
    const row = Math.floor(index / 7);
    const col = index % 7;
    const color = board[row][col] === 0 ? '#ddd' : board[row][col] === 1 ? 'red' : 'yellow';
    cell.style.backgroundColor = color;
  });
}

// Function to check for a winner
function checkWin(row, col) {
  // Check horizontal
  let count = 1;
  for (let i = col + 1; i < 7 && board[row][i] === player; i++) {
    count++;
  }
  for (let i = col - 1; i >= 0 && board[row][i] === player; i--) {
    count++;
  }
  if (count >= 4) return true;

  // Check vertical
  count = 1;
  for (let i = row + 1; i < 6 && board[i][col] === player; i++) {
    count++;
  }
  if (count >= 4) return true;

  // Check diagonal (top-left to bottom-right)
  count = 1;
  for (let i = row + 1, j = col + 1; i < 6 && j < 7 && board[i][j] === player; i++, j++) {
    count++;
  }
  for (let i = row - 1, j = col - 1; i >= 0 && j >= 0 && board[i][j] === player; i--, j--) {
    count++;
  }
  if (count >= 4) return true;

  // Check diagonal (top-right to bottom-left)
  count = 1;
  for (let i = row + 1, j = col - 1; i < 6 && j >= 0 && board[i][j] === player; i++, j--) {
    count++;
  }
  for (let i = row - 1, j = col + 1; i >= 0 && j < 7 && board[i][j] === player; i--, j++) {
    count++;
  }
  if (count >= 4) return true;

  return false;
}

// Function to reset the game
function resetGame() {
  board = [];
  for (let i = 0; i < 6; i++) {
    board[i] = new Array(7).fill(0);
  }
  gameOver = false;
  player = 1;
  playerDisplay.textContent = `Player ${player}'s Turn`;
  renderBoard();
}

// Add event listener to reset button
resetBtn.addEventListener('click', resetGame);

// Create the game board
createBoard();
