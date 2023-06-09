// DOM Elements

const timerDisplay = document.getElementById('timer');
const numbersDisplay = document.querySelectorAll('.number');

const timeOut = document.getElementById('time-out');
const guessSection = document.getElementById('guess');
const table = document.getElementById('table');
const playerGuessesElements = document.querySelectorAll('.answer');

const guessButton = document.getElementById('guess-button');
const resultDisplay = document.getElementById('result');
const displayResultMessage = document.getElementById('result-message');

const replayButton = document.getElementById('play-again-button');

const difficulty = 30;

let cells = [];
let playerGuesses = [];
let whatSimonSaid = [];

/********************************************* */
// Functions
/********************************************* */

/**
 * Generate as many as the argoument random numbers
 * @param {number} length how many numbers simon must say
 * @returns {[number]} the array with simon's random numbers
 */
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

/**
 * Cycles through the answers html slo and it updates players guesses
 */
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
/**
 * Renders the table
 */
const renderTable = () => {

    /**
     * Crates the cell 
     */
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

/**
 * Returns player score
 * @param {[number]} answers the right answers, what Simon said
 * @param {[number]} guesses pleyer guesses
 * @returns {number} player's score
 */
const getScore = (answers, guesses) => {
    let score = 0;

    for (let guess of guesses) {
        if (answers.includes(guess)) score++;
    }

    return score;
}

/**
 * The logic to start the game
 */
const startGame = () => {
    // what simeon said is the array with the right answers
    whatSimonSaid = getWhatSimonSays(5);

    // display the right numbers
    for (let i = 0; i < numbersDisplay.length; i++) {
        numbersDisplay[i].innerText = whatSimonSaid[i];
    }

    // set seconds to the current difficulty
    let seconds = difficulty;

    // starts the countdown
    const timer = setInterval(() => {
        timerDisplay.innerText = --seconds;
        if (!seconds) {
            clearInterval(timer);
            renderTable();
        }
    }, 1000);
}

/********************************************* */
// MAIN
/********************************************* */


startGame();

guessButton.addEventListener('click', () => {

    /**
     * Returns an appropriate message based on the player's score
     * @param {number} score player's score
     * @returns {string} the message to display based on the player's score
     */
    const getResultMessage = score => {
        let message;
        switch (score) {
            case 0:
                message = `Very BAD!! You guessed 0 right answers 🤦‍♂️`;
                break;
            case 4:
                message = `FANTASTIC!! You have guessed ${score} right answers`;
                break;
            case 5:
                message = `YOU ARE A MONSTER!! You guessed all the right answers!!`
                break;
            default:
                message = `You guessed ${score} answers!`;
        }
        return message;
    }

    // changes which section appears on screen
    guessSection.classList.add('d-none');
    resultDisplay.classList.remove('d-none');

    // resets the table
    table.innerText = '';

    // get the player's score and then the message
    const score = getScore(whatSimonSaid, playerGuesses);
    const message = getResultMessage(score);

    // display the message
    displayResultMessage.innerHTML = message;
});

replayButton.addEventListener('click', () => {

    // changes which section appears on screen
    resultDisplay.classList.add('d-none');
    timeOut.classList.remove('d-none');

    // empties the arrays
    playerGuesses = [];
    whatSimonSaid = [];

    // empties html elements where are displayed player's guesses
    playerGuessesElements.forEach(element => {
        element.innerText = '_';
    });

    //reset the timer displa
    timerDisplay.innerText = difficulty;

    // restart the game
    startGame();
});