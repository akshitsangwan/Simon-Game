let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let firstRun = true;
let level = 0;
$(document).on("keydown",function() {
    if(firstRun) {
        $("#level-title").text("Level "+level);
        nextSequence();
        firstRun=false;
    }
});

$(".btn").on("click",function() {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    makeSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
    userClickedPattern= [];
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColour);
    level++;
    $("#level-title").text("Level "+level);
}

function makeSound(colour) {
    switch(colour)
    {
        case "blue":
            let audio1 = new Audio("sounds/blue.mp3");
            audio1.play();
            break;
        case "green":
            let audio2 = new Audio("sounds/green.mp3");
            audio2.play();
            break;
        case "red":
            let audio3 = new Audio("sounds/red.mp3");
            audio3.play();
            break;
        case "yellow":
            let audio4 = new Audio("sounds/yellow.mp3");
            audio4.play();
            break;
        case "wrong":
            let audio5 = new Audio("sounds/wrong.mp3"); 
            audio5.play();
            break;
    }
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    },100);
}


function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]) {
        console.log("success");
        if(userClickedPattern.length === gamePattern.length)
            setTimeout(function() {
                nextSequence();
            },1000);
    }
    else {
        console.log("wrong");

        makeSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    firstRun = true;
}