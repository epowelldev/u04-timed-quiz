//JS file for timed quiz, u04 homework


// THINGS I WILL NEED
// vars to hold questions/answers
// 25 question pool, 10 random questions per quiz ** extra **
//question arrays are as follows: ["Question", "Answer1", "Answer2", "Answer3", "Answer4", "Correct Answer"]


var questionList = [
    {
        question: "What is a good source of protien?", 
        answers: ["Water", "Rocks", "Air", "Caribou"],
        correct: 3
    },
    {
        question: "What is the best source of hydration?",
        answers: ["water", "Coffee", "Pepsi", "Coke"],
        correct: 0
    },
    {
        question: "What is an element?",
        answers: ["Green", "Cobalt", "Blue", "White"],
        correct: 1
    },
    {
        question: "Is JavaScript fun?",
        answers: ["Sometimes", "No", "Yes", "Fun is relitive"],
        correct: 3
    },
    {
        question: "Does JS give you a migraine?",
        answers: ["Absolutely", "Of course", "I'm not a superhero", "I am only human"],
        correct: true
    }
];


console.log(questionList);

// clock/timer functions (setInterval/clearInterval)
var timeScore = 100;
var timeScoreDisplay = document.querySelector(".time");
var startQ = document.querySelector("#start-quiz");

function startGame() {
    document.querySelector(".welcome").classList.remove("active");
    document.querySelector(".welcome").classList.add("hidden");
    document.querySelector(".qCard").classList.remove("hidden");


    var scoreInterval = setInterval(function() {
        timeScore--;
        timeScoreDisplay.textContent = "Time: " + timeScore;

        if(timeScore === 0) {
            clearInterval(scoreInterval);

        }
    }, 1000)
}

console.log(document)

// forums for highscore (or prompt)
// event handler for click (to start)
startQ.addEventListener("click", startGame);

// checks for correct/incorrect
// if `clicked answer` != questonNumber[5]
//  -10 seconds

// dynamicly adding/removing questions into DOM




var selectedQuestions = [];
// 10 random questions per quiz ** extra **
function pickQuestions() {
    // randomly # question from list
    for (let i = 0; i < 10; i++) {
        var randomQuestion = Math.floor(Math.random() * 24);
        console.log(randomQuestion);
        selectedQuestions.push(randomQuestion);
        //add a check for duplicate questions later
    }
}

pickQuestions();
console.log(selectedQuestions);











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