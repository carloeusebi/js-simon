// DOM Elements

const timerDisplay = document.getElementById('timer');
const numbersDisplay = document.querySelectorAll('.number');

const difficulty = 30;

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
    }
}, 1000);