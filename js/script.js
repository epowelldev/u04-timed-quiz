//JS file for timed quiz, u04 homework

// vars to hold questions/answers
var questionList = [
    {
        question: "What is a good source of protien?", 
        answers: ["Water", "Rocks", "Air", "Caribou"],
        correct: 3
    },
    {
        question: "What is the best source of hydration?",
        answers: ["Water", "Coffee", "Pepsi", "Coke"],
        correct: 0
    },
    {
        question: "What is an element?",
        answers: ["Green", "Cobalt", "Blue", "White"],
        correct: 1
    },
    {
        question: "This is extremly hot.",
        answers: ["Ice", "LOX", "RP-1", "Lava"],
        correct: 3
    },
    {
        question: "This is NOT a CSS framework:",
        answers: ["Bootstrap", "Tailwind", "Santa", "Bulma"],
        correct: 2
    }
];

//Pointer to looping through object questionList
var questionIndex = 0;
console.log(questionList[questionIndex]);

var timeScore = 50;

// clock/timer functions (setInterval/clearInterval)
var timeScoreDisplay = document.querySelector(".time");
var startQ = document.querySelector("#start-quiz");
var buttonBox = document.querySelector(".button-box");
var submitScore = document.querySelector("#submit-highscore");
var resetGameBTN = document.querySelector(".reset");
var scoreInterval;


// GAME START THROUGH CLICK
// event handler for click (to start)
startQ.addEventListener("click", startGame);
// event handler for clicking answer buttons to check the awnser
buttonBox.addEventListener("click", checkAnswer);
//event handler for submitting highscore
submitScore.addEventListener("click", submitHighscore);
//reset game event handler
resetGameBTN.addEventListener("click", resetGame);

//FUNCTIONS

//Startgame, event click to start the game, general game loop through `display.Question`
function startGame() {
    document.querySelector(".welcome").classList.toggle("hidden");
    document.querySelector(".qCard").classList.toggle("hidden");


    scoreInterval = setInterval(function() {
        timeScore--;
        timeScoreDisplay.textContent = "Time: " + timeScore;

        if(timeScore === 0) {
            endGame();
        }
    }, 1000)

    displayQuestion();

}


// dynamicly adding/removing questions into DOM
function displayQuestion() {
    var questionText = document.querySelector("#question");
    var buttonElements = document.querySelectorAll(".answer");
    console.log(buttonElements);
    questionText.textContent = questionList[questionIndex].question;

    for (let i = 0; i < buttonElements.length; i++) {
        buttonElements[i].textContent = questionList[questionIndex].answers[i];
    }
}

// checks for correct/incorrect
// if `clicked answer` != questonNumber[5]
//  -10 seconds
function checkAnswer(event) {
    console.log("woot");

    if (event.target.matches("button")) {
        console.log(event)
        let answer = event.target.getAttribute("data-index");
        if (answer != questionList[questionIndex].correct) {
            timeScore -= 10;
            if (timeScore < 1) timeScore = 0;
            console.log("INCORRECT");
        } else {
            console.log("CORRECT");
        }

        questionIndex++;

        if (questionIndex == questionList.length) {
            endGame();
        } else {
            displayQuestion();
        }
    }
timeScoreDisplay.textContent = "Time: " + timeScore;
}

// ENDS the game, hides questions and shows the Highscore Form IF you produced a score
// if you did not produce a score (timeScore==0) You failed and don't get to submit your initials
function endGame() {
    console.log("LE FINI");
    clearInterval(scoreInterval);
    questionIndex = 0;
    if (timeScore == 0) {
        document.querySelector(".qCard").classList.toggle("hidden");
        document.querySelector(".failure").classList.toggle("hidden");
    } else {
        document.querySelector(".qCard").classList.toggle("hidden");
        document.querySelector(".highscore-entry").classList.toggle("hidden");
    }
}

function resetGame() {
    document.querySelector(".failure").classList.toggle("hidden");
    document.querySelector(".highscore-entry").classList.toggle("hidden");
    document.querySelector(".welcome").classList.toggle("hidden");
    // timeScore = 50;
    // timeScoreDisplay.textContent = "Time: " + timeScore;
}

// forums for highscore (or prompt)
function submitHighscore(event) {
    event.preventDefault();
    console.log("SUBMITTED YOUR HIGHSCORE");
}







// WHEN I click the start button
//addEventListener

// THEN a timer starts and I am presented with a question
//starting score 100, time counts down, wrong question -10

// WHEN I answer a question
//click a button

// THEN I am presented with another question
//delete html through DOM, repopulate html through DOM

// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
//-10 for incorrect

// WHEN all questions are answered or the timer reaches 0
//while time != 0 continue game?
//if time = 0, then end game

// THEN the game is over

// WHEN the game is over


// THEN I can save my initials and score
//add form for initials for high score

console.log(resetGameBTN);