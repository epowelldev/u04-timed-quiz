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

//starting highScoreList & highScore vars
var highScoreList = [];

if ( JSON.parse(localStorage.getItem("highScoreList")) ) {
    highScoreList = JSON.parse(localStorage.getItem("highScoreList"));
}

var highScoreElement = document.querySelectorAll(".hs-score");
var highScoreInitials = document.querySelectorAll(".hs-initials");


//Pointer to looping through object questionList
var questionIndex = 0;

var timeScore = 50;
var timeScoreDisplay = document.querySelector(".time");
var startQ = document.querySelector("#start-quiz");
var buttonBox = document.querySelector(".button-box");
var submitScore = document.querySelector("#submit-highscore");
var resetGameBTN = document.querySelectorAll(".reset");
var viewHS = document.querySelector(".view-scores");
var scoreInterval;
var completedQuestionIcons = document.querySelectorAll(".completed-question-icon");

// vars for each major display block (for toggling hidden)
var welcomeDisplay = document.querySelector(".welcome");
var qCardDisplay = document.querySelector(".qCard");
var failureDisplay = document.querySelector(".failure");
var hsEntryDisplay = document.querySelector(".highscore-entry");
var hsListDisplay = document.querySelector(".highscores");


// GAME START THROUGH CLICK
// event handler for click (to start)
startQ.addEventListener("click", startGame);

// event handler for clicking answer buttons to check the awnser
buttonBox.addEventListener("click", checkAnswer);

//event handler for submitting highscore
submitScore.addEventListener("click", submitHighscore);

//reset game event handler
resetGameBTN[0].addEventListener("click", resetGame);
resetGameBTN[1].addEventListener("click", resetGame);

// event handler for viewing highscores
viewHS.addEventListener("click", renderHighscores);

//FUNCTIONS

//Startgame, event click to start the game, general game loop through `display.Question`
function startGame() {
    welcomeDisplay.classList.toggle("hidden");
    qCardDisplay.classList.toggle("hidden");


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

    if (event.target.matches("button")) {
        console.log(event)
        let answer = event.target.getAttribute("data-index");
        if (answer != questionList[questionIndex].correct) {
            timeScore -= 10;
            if (timeScore < 1) timeScore = 0;
            console.log("INCORRECT");
            completedQuestionIcons[questionIndex].classList.toggle("incorrect");
        } else {
            console.log("CORRECT");
            completedQuestionIcons[questionIndex].classList.toggle("correct");
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
    // console.log("LE FINI");
    clearInterval(scoreInterval);
    questionIndex = 0;
    if (timeScore == 0) {
        qCardDisplay.classList.toggle("hidden");
        failureDisplay.classList.toggle("hidden");
    } else {
        qCardDisplay.classList.toggle("hidden");
        hsEntryDisplay.classList.toggle("hidden");
    }
}

function resetGame(event) {
    event.preventDefault();

    if (event.target.matches("button")) {

        if ( !(failureDisplay.classList.contains("hidden")) ) {
            failureDisplay.classList.toggle("hidden");
        }

        if ( !(hsEntryDisplay.classList.contains("hidden")) ) {
            hsEntryDisplay.classList.toggle("hidden");
        }
        
        if (welcomeDisplay.classList.contains("hidden")) {
            welcomeDisplay.classList.toggle("hidden");
        }

        for (let i = 0; i < completedQuestionIcons.length; i++) {
            completedQuestionIcons[i].classList.remove("correct");
            completedQuestionIcons[i].classList.remove("incorrect");
        }

        if (document.querySelector("#submit-highscore").classList.contains("hidden")) {
            document.querySelector("#submit-highscore").classList.remove("hidden");
        }

        timeScore = 50;
        timeScoreDisplay.textContent = "Time: " + timeScore;

    }

}

// forums for highscore (or prompt)
function submitHighscore(event) {
    if (event.target.matches("button")) {
        event.preventDefault();
        var initialsInput = document.querySelector("#initials");
        var initialsText = initialsInput.value.trim();
        var scoreAchived = timeScore;
        var newHighScore = {
            initials: initialsText,
            score: scoreAchived,
        };

        console.log(newHighScore);

        //adds the newly submitted highscore to the list, & stores it locally
        highScoreList.push(newHighScore);
        localStorage.setItem("highScoreList", JSON.stringify(highScoreList));

        //hides submit button and logs confirmation of submission
        document.querySelector("#submit-highscore").classList.add("hidden");
        console.log("SUBMITTED YOUR HIGHSCORE");
    }
}

// Renders highscores onto the page
function renderHighscores(event) {
    if (event.target.matches("a")) {

        if (viewHS.textContent == "View Highscores") {

            //clears timer, soft 'reset'
            clearInterval(scoreInterval);
            timeScore = 50;
            timeScoreDisplay.textContent = "Time: " + timeScore;
            questionIndex = 0;            

            hsListDisplay.classList.toggle("hidden");

            if ( !(failureDisplay.classList.contains("hidden")) ) {
                failureDisplay.classList.toggle("hidden");
            }
    
            if ( !(hsEntryDisplay.classList.contains("hidden")) ) {
                hsEntryDisplay.classList.toggle("hidden");
            }

            if ( !(welcomeDisplay.classList.contains("hidden")) ) {
                welcomeDisplay.classList.toggle("hidden");
            }

            if ( !(qCardDisplay.classList.contains("hidden")) ) {
                qCardDisplay.classList.toggle("hidden");
            }

            for (let i = 0; i < completedQuestionIcons.length; i++) {
                completedQuestionIcons[i].classList.remove("correct");
                completedQuestionIcons[i].classList.remove("incorrect");
            }

            if (highScoreList != "") {
                //sets the `storedHighScore` from local storage
                highScoreList = JSON.parse(localStorage.getItem("highScoreList"));

                //sorts `highScoreList` object in decending order by score value
                highScoreList.sort(function(a, b) {
                    return b.score - a.score;
                });

                if (highScoreList.length > 10) {
                    highScoreList = highScoreList.slice(0, 10)
                }

                //loops over the arrays of initials, scores, and stored data to display highscores
                for (let i = 0; i < highScoreList.length; i++) {
                    highScoreElement[i].textContent = highScoreList[i].score;
                    highScoreInitials[i].textContent = highScoreList[i].initials;
                }
            }
            viewHS.textContent = "Hide Highscores";

        } else { 

            hsListDisplay.classList.toggle("hidden");
            viewHS.textContent = "View Highscores";
            
            if ( !(failureDisplay.classList.contains("hidden")) ) {
                failureDisplay.classList.toggle("hidden");
            }
    
            if ( !(hsEntryDisplay.classList.contains("hidden")) ) {
                hsEntryDisplay.classList.toggle("hidden");
            }

            if ( (welcomeDisplay.classList.contains("hidden")) ) {
                welcomeDisplay.classList.remove("hidden");
            }

            if ( !(qCardDisplay.classList.contains("hidden")) ) {
                qCardDisplay.classList.toggle("hidden");
            }
            
        }

    }

}

