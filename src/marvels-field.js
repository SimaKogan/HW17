const words = ["tomorrow", "incorrectly", "fire", "nothing", "stairs"];
const questions = ["What is always coming but never arrives? ", 
"What word is spelled incorrectly in every single dictionary?", 
"What is it that lives if it is fed, and dies if you give it a drink?", 
"What’s greater than God and more evil than the devil. Rich people want it, poor people have it. And if you eat it, you’ll die?",
"What goes up and down, but always remains in the same place?"];

let generatedIndex;
let hiddenWord;
let flGameOver = false;

const sectionElement = document.querySelector(".word-guess")
const questionElement = document.querySelector(".question-alert");
const gameOverElement = document.querySelector(".game-over-message");
const playAgainElement = document.getElementById("play-again");

function getGeneratedIndex() {
    return Math.floor(Math.random() * words.length)
}

function showQuestion(generatedIndex) {
    let question = questions[generatedIndex];
    return `Question: ${question}`;
}

function getDivsElements(generatedIndex) {
    let wordField = words[generatedIndex];
    let wordFieldAr = Array.from(wordField);
    let res = wordFieldAr.map(letter => `<div class="letter-guess">${letter}</div>`);
    return res.join('');
}

function onChange(event) {
    const enteredWord = event.target.value;
    const letterElements = document.querySelectorAll(".letter-guess");

    if (flGameOver) {
        alert("game is over");
        return;
    }

    const enteredWordArray = Array.from(enteredWord);
    const hiddenWordArray = Array.from(hiddenWord);
    enteredWordArray.forEach((enteredLetter, enteredIndex) => {
        hiddenWordArray.forEach((hiddenLetter, hiddenIndex) => {
            if (enteredLetter === hiddenLetter) {
                letterElements[hiddenIndex].style.background = "white"
            }
        })
    });

    let counter = 0
    letterElements.forEach(el => {
        if (el.style.background === 'white') {
            counter += 1
        }
    })

    if (counter === hiddenWordArray.length) {
        endGame()
    }

    document.querySelector(".input-text").value = '';
}
function endGame() {
    gameOverElement.innerHTML = "Congratulations you are winner!!!";

    playAgainElement.style.display = 'block';
    flGameOver = true;
}

function startGame() {
    generatedIndex = getGeneratedIndex();
    hiddenWord = words[generatedIndex];
    playAgainElement.style.display = 'none';

    document.querySelector(".input-text").value = '';
    gameOverElement.innerHTML = "";
    flGameOver = false;

    questionElement.innerHTML = showQuestion(generatedIndex);
    sectionElement.innerHTML = getDivsElements(generatedIndex);
}

startGame();