// DOM Elements

const timerDisplay = document.getElementById('timer');
const numbersDisplay = document.querySelectorAll('.number');

const timeOut = document.getElementById('time-out');
const guessSection = document.getElementById('guess');
const table = document.getElementById('table');

const difficulty = 5;

let cells = [];

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

const handleCellClick = () => {

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

}

/********************************************* */
// MAIN
/********************************************* */

let whatSimonSaid = getWhatSimonSays(5);;
displayWhatSimonSaid(whatSimonSaid);

let seconds = difficulty;

const timer = setInterval(() => {
    timerDisplay.innerText = --seconds;
    if (!seconds) {
        clearInterval(timer);
        renderTable();
    }
}, 1000);