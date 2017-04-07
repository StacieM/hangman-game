var wordList= [
    "mustang", 
    "corvette", 
    "ferrari", 
    "porsche", 
    "eurovan", 
    "lamborghini",
    "prius", 
    "bugatti"
    ];


var imageList= [
    "assets/images/mustang.jpg", 
    "assets/images/corvette.jpg",
    "assets/images/ferrari.jpg",
    "assets/images/porsche.jpg",
    "assets/images/eurovan.jpg",
    "assets/images/lamborghini.jpg",
    "assets/images/prius.jpg", 
    "assets/images/bugatti.jpg"
    ];




var ChosenWord = "a";
var arrayWord = []; 
var arrayP = []; 
var chosenCharacter = "";
var guesses = 12;
var guessedLetters = [];
var chosenNumber = 0;
var gameStarted = false;
var wins = 0;
var losses = 0;
var keyPressed = "";

function StartGame(event){
    if (!gameStarted) {InitGame()}
    else{
        game()}
}

function InitGame(){ //sets starting parameters
    chosenNumber=Math.floor(Math.random() * wordList.length);
    ChosenWord = wordList[chosenNumber];
    arrayWord = ChosenWord.split(""); //split string into array of char
    chosenCharacter = imageList[chosenNumber]
    guesses=12;
    underscore();
    document.getElementById("car-pic").src= "assets/images/ferrariemblem.jpg";  //inserts logo at start of game
    document.getElementById("notStart").innerHTML = null; //"press any key" disappears because of null
    document.getElementById("problem").innerHTML = arrayP.join(" "); //replaces the html and adds corresponding underscores
    document.getElementById("guesses").innerHTML = "Guesses left: " + guesses;
    document.getElementById("wins").innerHTML = "Wins: " + wins;
    document.getElementById("loss").innerHTML = "Losses: " + losses;
    gameStarted = true;
}
function underscore(){
    arrayP=[null];
    for (var i=0; i<ChosenWord.length; i++)
    {
        arrayP[i] = "_";
    }
}
function game(){ //actual game loop
    keyPressed=CheckKey(event);
    update();
}

function CheckKey(event)
{
    return String.fromCharCode(event.which || event.keyCode);
}

function update(){
    checkInput();
    checkSolve();
    updateDisplay();
}
function checkInput(){
    var correct = false;
    var existing = false;

    for (var i = 0; i<arrayWord.length; i++) {
        if (keyPressed==arrayWord[i]) {
            arrayP[i] = keyPressed;
            correct = true;
        }
    }

    if (guessedLetters==[]) {
        guessedLetters=guessedLetters.push(keyPressed);
    }
    else{
        for (var i = 0; i<guessedLetters.length; i++) {
            if(guessedLetters[i]==keyPressed){existing=true}
        }
        if(!existing){guessedLetters.push(keyPressed)}
    }
    if(!correct&&!existing){guesses--}
    checkGameOver();
}
function checkSolve(){
    if (arrayP.join("")==arrayWord.join("")){
        document.getElementById("notStart").innerHTML = "Press any key to start"; 
        wins++;
        document.getElementById("car-pic").src = chosenCharacter;
        document.getElementById("wins").innerHTML = "Wins: " + wins;
        gameStarted=false;
        guessedLetters=[]; //resets guessed letters
    }
}
function checkGameOver(){
    if(guesses==0){
        document.getElementById("notStart").innerHTML = "Press any key to start"; 
        losses++;
        document.getElementById("car-pic").src = chosenCharacter;
        document.getElementById("loss").innerHTML = "Losses: " + losses;
        gameStarted = false;
        guessedLetters = [];
        InitGame();
    }
}
function updateDisplay(){
        document.getElementById("problem").innerHTML = arrayP.join(" ").toUpperCase();    
        document.getElementById("entered").innerHTML = guessedLetters;
        document.getElementById("guesses").innerHTML = "Guesses left: " + guesses;
}


