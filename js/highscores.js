
renderHighscores();

// Renders highscores onto the page
function renderHighscores() {

}

var highScoreList = [
    {
        initials: "AB",
        score: 5,
    },
    {
        initials: "CD",
        score: 4,
    }
];

localStorage.setItem("highScoreList", JSON.stringify(highScoreList));
console.log(JSON.stringify(highScoreList));
console.log(localStorage.highScoreList);
console.log(highScoreList);


var testStorage = JSON.parse(localStorage.getItem("highScoreList"));
console.log(testStorage);


const array1 = [1, 30, 4, 21, 100000];
array1.sort();
console.log(array1);