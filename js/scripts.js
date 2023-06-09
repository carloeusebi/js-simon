// DOM Elements

const timerDisplay = document.getElementById('timer');
const numbersDisplay = document.querySelectorAll('.number');

const timeOut = document.getElementById('time-out');
const guessSection = document.getElementById('guess');
const table = document.getElementById('table');
const playerGuessesElements = document.querySelectorAll('.answer');

const guessButton = document.getElementById('guess-button');
const displayResult = document.getElementById('result');

const difficulty = 1;

let cells = [];
let playerGuesses = [];
let whatSimonSaid = [];

/********************************************* */
// Functions
/********************************************* */

const getWhatSimonSays = length => {
    const getRndNumber = () => Math.floor(Math.random() * 100) + 1;

    let randomNumbers = [];

    while (randomNumbers.length < length) {
        do {
            number = getRndNumber();
        } while (randomNumbers.includes(number))
        randomNumbers.push(number);
    };

    return randomNumbers;
}

const displayWhatSimonSaid = numbers => {
    for (let i = 0; i < numbers.length; i++) {
        numbersDisplay[i].innerText = numbers[i];
    }
}

const updateGuesses = () => {
    for (let i = 0; i < playerGuessesElements.length; i++) {
        if (playerGuesses[i]) {
            playerGuessesElements[i].innerText = playerGuesses[i];
        } else {
            playerGuessesElements[i].innerText = '_';
        }
    }
}

function handleCellClick() {

    const wasSelected = cell => cell.classList.contains('active');

    // removes the current choice from the guesses list
    if (wasSelected(this)) {
        this.classList.remove('active');
        const number = parseInt(this.getAttribute('number'));
        const index = playerGuesses.indexOf(number);
        console.log(index);
        playerGuesses.splice(index, 1);
    } else { // if it wanst a previous guess it adds it to the guesses list

        // if guesslist is full it removes oldest guuess
        if (playerGuesses.length === 5) {
            const guessToRemove = playerGuesses.shift() - 1;
            cells[guessToRemove].classList.remove('active');

        }
        number = parseInt(this.innerText);
        this.classList.add('active');
        playerGuesses.push(number);
    }

    updateGuesses();
}

const renderTable = () => {

    const createCell = num => {
        const cell = document.createElement('div');
        cell.className = 'square';
        cell.innerText = num;
        cell.setAttribute('number', num);
        cell.addEventListener('click', handleCellClick);
        return cell;
    }

    //hides countdown and shows table
    timeOut.classList.add('d-none');
    guessSection.classList.remove('d-none');

    for (let i = 1; i <= 100; i++) {
        const cell = createCell(i);
        table.appendChild(cell);
    }

    cells = document.querySelectorAll('.square');
}

const getScore = (answers, guesses) => {
    let score = 0;

    for (let guess of guesses) {
        if (answers.includes(guess)) score++;
    }

    return score;
}

/********************************************* */
// MAIN
/********************************************* */

whatSimonSaid = getWhatSimonSays(5);;
displayWhatSimonSaid(whatSimonSaid);

let seconds = difficulty;

const timer = setInterval(() => {
    timerDisplay.innerText = --seconds;
    if (!seconds) {
        clearInterval(timer);
        renderTable();
    }
}, 1000);


guessButton.addEventListener('click', () => {
    const getResultMessage = score => {
        let message;
        switch (score) {
            case 0:
                message = `Very BAD!! You guessed 0 right answers`;
                break;
            case 4:
            case 5:
                message = `FANTASTIC!! You have guessed ${score}`;
                break;
            default:
                message = `You guessed ${score} answers!`;
        }
        return message;
    }

    guessSection.classList.add('d-none');
    displayResult.classList.remove('d-none');
    const score = getScore(whatSimonSaid, playerGuesses);
    const message = getResultMessage(score);
    displayResult.innerHTML = message;
});