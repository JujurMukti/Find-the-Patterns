const correctPattern = [0, 1, 2, 12, 22];
const soundCorrect = document.getElementById("sound-correct");
const soundIncorrect = document.getElementById("sound-wrong");

let gridCol = 10; 
let gridRow = 10;
let cells = [];
let cellPos = [];
let start = false;
let checkToggle;

function playSound(sound) {
sound.pause();
sound.currentTime = 0;
sound.volume = 0.5;
sound.play();
}

function getIndex(x, y) {
  return y * gridCol + x;
}

function cellClick(cell) {
  cell.addEventListener("click", () => {
  cell.classList.toggle('active');
  const x = parseInt(cell.dataset.x);
  const y = parseInt(cell.dataset.y);
  const index = getIndex(x, y);
  if (cell.classList.contains('active')) cellPos.push(index), cellPos.sort((a, b) => a - b);
  else cellPos = cellPos.filter(item => item !== index);
  console.log(cellPos);
  });
}

function createGrid() {
  for (let y = 0; y < gridRow; y++) {
    for (let x = 0; x < gridCol; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.x = x;
      cell.dataset.y = y;
      gameBoard.appendChild(cell);
      cells.push(cell);
      cellClick(cell);
    }
  }
}

function showPopup(message, isSuccess) {
  const popup = document.getElementById('popup');
  popup.classList.remove('try-again');
  popup.innerHTML = `
    <div class="popup-box">${message}</div>
  `;
  if (isSuccess) popup.style.backgroundColor = 'rgba(47, 255, 0, 0.6)';
  else popup.style.backgroundColor = 'rgb(244, 37, 37, 0.6)';
  popup.classList.add('show');
  if (!isSuccess) {
    setTimeout(() => {
      popup.classList.remove('show');
    }, 2000);
  }
}


document.getElementById('submit').addEventListener('click', () => {
  const isCorrect = JSON.stringify(cellPos) === JSON.stringify(correctPattern);
  showPopup(isCorrect ? "CORRECT PATTERN!" : "TRY AGAIN!", isCorrect);
  isCorrect ? playSound(soundCorrect) : playSound(soundIncorrect);
});

document.getElementById('reset').addEventListener('click', () => {
  cellPos = [];
  cells.forEach(cell => cell.classList.remove('active'));
});

createGrid();