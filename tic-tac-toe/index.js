const choseWariant = document.querySelector('.chose-wariant');
const select = document.querySelector('.select');
const radio = document.querySelector('.radio');
const radioBotton = document.querySelectorAll('input[name="complexity"]');
let AI = false; // с компом или нет
let complexity = ''; // сложность

choseWariant.addEventListener('click', (event) => {
  if (event.target.textContent === 'Человек vs Комп') {
    AI = true;
    radio.style.display = 'flex';
    radioBotton.forEach((elem) => {
      elem.addEventListener('click', (e) => {
        complexity = e.target.value;
        choseWariant.style.display = 'none';
      });
    });
  } else if (event.target.textContent === 'Человек vs Человек') {
    choseWariant.style.display = 'none';
  }
});

const winerCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
];
let winnerScore = [];
let count = 0;
const board = document.querySelector('.board');
const winnerBlock = document.querySelector('.winner');
const tableWinners = document.querySelector('.table-winners');

board.addEventListener('click', (e) => {
  if (count % 2 === 0 && e.target.textContent === '') {
    e.target.classList.add('cross');
    e.target.innerHTML = 'x';
    count++;

    if (AI) {
      setTimeout(() => {
        computerStep();
      }, 500);
    }
    checkWinner(e.target.innerHTML);
  } else if (count % 2 !== 0 && e.target.textContent === '') {
    if (!AI) {
      e.target.classList.add('circle');
      e.target.innerHTML = 'o';
      count++;
      checkWinner(e.target.textContent);
    }
  } else {
    alert();
    setTimeout(() => {
      deleteAlert();
    }, 1000);
  }
});

function alert() {
  document.querySelector('.alert').style.display = 'block';
}
function deleteAlert() {
  document.querySelector('.alert').style.display = 'none';
}

function checkWinner(symbol) {
  for (i = 0; i < winerCombinations.length; i++) {
    if (
      board.children[winerCombinations[i][0] - 1].textContent === symbol &&
      board.children[winerCombinations[i][1] - 1].textContent === symbol &&
      board.children[winerCombinations[i][2] - 1].textContent === symbol
    ) {
      let winner = symbol === 'x' ? 'Победили крестики за ' + count + ' ходов' : 'Победили нолики за ' + count + ' ходов';
      addWinerMessage(winner);
      addToLocalStorage(winner);
      return;
    }
  }
  if (count === 9) {
    let winner = 'Ничья, Победила дружба :)';
    addWinerMessage(winner);
    addToLocalStorage(winner);
  }
}

function addToLocalStorage(winner) {
  if (!localStorage.getItem('games')) {
    let winnerScore = [winner];
    localStorage.setItem('games', JSON.stringify(winnerScore));
  } else {
    winnerScore = JSON.parse(localStorage.getItem('games'));
    winnerScore = [winner, ...winnerScore];
    localStorage.setItem('games', JSON.stringify(winnerScore));
  }
}

function addWinerMessage(winner) {
  let createTable = JSON.parse(localStorage.getItem('games'));
  document.querySelector('.winner-text').textContent = winner;
  document.querySelector('.winner').style.display = 'flex';
  if (localStorage.getItem('games')) {
    createTable.map((data, index) => {
      if (index < 10) {
        const tableWinersScore = document.createElement('div');
        tableWinersScore.classList.add('table-winers-score');
        tableWinersScore.textContent = index + 1 + ') ' + data;
        tableWinners.append(tableWinersScore);
      }
    });
  }
  document.querySelector('.new-game').addEventListener('click', (e) => {
    window.location.reload();
  });
}

//  AI
function computerStep() {
  if (complexity === 'Easy') {
    if (AI && count % 2 !== 0 && board.children[randomInteger(0, 8)].textContent === '') {
      randStep();
    } else {
      computerStep();
    }
  }
  if (complexity === 'Hard' && AI) {
    if (count === 1) {
      if (board.children[4].textContent === 'x') {
        if (board.children[0].textContent === '') {
          board.children[0].classList.add('circle');
          board.children[0].innerHTML = 'o';
          count++;
        }
      } else if (board.children[4].textContent !== 'x') {
        if (board.children[4].textContent === '') {
          board.children[4].classList.add('circle');
          board.children[4].innerHTML = 'o';
          count++;
        }
      }
    }
    if (count === 3 && count % 2 !== 0) {
      if (board.children[1].textContent === 'x' && board.children[3].textContent === 'x' && board.children[4].textContent === 'o') {
        board.children[0].classList.add('circle');
        board.children[0].innerHTML = 'o';
        count++;
      } else if (board.children[1].textContent === 'x' && board.children[5].textContent === 'x' && board.children[4].textContent === 'o') {
        board.children[2].classList.add('circle');
        board.children[2].innerHTML = 'o';
        count++;
      } else if (board.children[7].textContent === 'x' && board.children[5].textContent === 'x' && board.children[4].textContent === 'o') {
        board.children[8].classList.add('circle');
        board.children[8].innerHTML = 'o';
        count++;
      } else if (board.children[7].textContent === 'x' && board.children[3].textContent === 'x' && board.children[4].textContent === 'o') {
        board.children[6].classList.add('circle');
        board.children[6].innerHTML = 'o';
        count++;
      } else {
        findPreWin();
        randStep();
      }
    }
    if (count >= 5 && count % 2 !== 0) {
      findPreWin();
      randStep();
    }
    if (count >= 7 && count % 2 !== 0) {
      findPreWin();
      randStep();
    }
  }
  setTimeout(() => {
    checkWinner('o');
  }, 400);
}

function findPreWin() {
  for (i = 0; i < winerCombinations.length; i++) {
    if (
      board.children[winerCombinations[i][0] - 1].textContent === 'o' &&
      board.children[winerCombinations[i][1] - 1].textContent === 'o' &&
      board.children[winerCombinations[i][2] - 1].textContent === ''
    ) {
      board.children[winerCombinations[i][2] - 1].classList.add('circle');
      board.children[winerCombinations[i][2] - 1].innerHTML = 'o';
      count++;
      break;
    } else if (
      board.children[winerCombinations[i][0] - 1].textContent === '' &&
      board.children[winerCombinations[i][1] - 1].textContent === 'o' &&
      board.children[winerCombinations[i][2] - 1].textContent === 'o'
    ) {
      board.children[winerCombinations[i][0] - 1].classList.add('circle');
      board.children[winerCombinations[i][0] - 1].innerHTML = 'o';
      count++;
      break;
    } else if (
      board.children[winerCombinations[i][0] - 1].textContent === 'o' &&
      board.children[winerCombinations[i][2] - 1].textContent === 'o' &&
      board.children[winerCombinations[i][1] - 1].textContent === ''
    ) {
      board.children[winerCombinations[i][1] - 1].classList.add('circle');
      board.children[winerCombinations[i][1] - 1].innerHTML = 'o';
      count++;
      break;
    } else if (
      board.children[winerCombinations[i][0] - 1].textContent === 'x' &&
      board.children[winerCombinations[i][1] - 1].textContent === 'x' &&
      board.children[winerCombinations[i][2] - 1].textContent === ''
    ) {
      board.children[winerCombinations[i][2] - 1].classList.add('circle');
      board.children[winerCombinations[i][2] - 1].innerHTML = 'o';
      count++;
      break;
    } else if (
      board.children[winerCombinations[i][0] - 1].textContent === '' &&
      board.children[winerCombinations[i][1] - 1].textContent === 'x' &&
      board.children[winerCombinations[i][2] - 1].textContent === 'x'
    ) {
      board.children[winerCombinations[i][0] - 1].classList.add('circle');
      board.children[winerCombinations[i][0] - 1].innerHTML = 'o';
      count++;
      break;
    } else if (
      board.children[winerCombinations[i][0] - 1].textContent === 'x' &&
      board.children[winerCombinations[i][2] - 1].textContent === 'x' &&
      board.children[winerCombinations[i][1] - 1].textContent === ''
    ) {
      board.children[winerCombinations[i][1] - 1].classList.add('circle');
      board.children[winerCombinations[i][1] - 1].innerHTML = 'o';
      count++;
      break;
    }
  }
}

function randStep() {
  let randNum = randomInteger(0, 8);
  if (count % 2 !== 0 && board.children[randNum].textContent === '') {
    board.children[randNum].classList.add('circle');
    board.children[randNum].innerHTML = 'o';
    count++;
    setTimeout(() => {
      checkWinner('o');
    }, 400);
  }
  if (board.children[randNum].textContent !== '' && count < 8) {
    randStep();
  }
}

function randomInteger(min, max) {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
