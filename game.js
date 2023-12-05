var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;


function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColour) {
    $("#" + currentColour).toggleClass('pressed');
    setTimeout(function() {
        $("#" + currentColour).toggleClass('pressed');
    }, 100);
}

function startOver() {
    gamePattern = [];
    level = 0;
    started = false;
}


function nextSequence() {
    level++;
    $("h1").text("Level " + level);
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    animatePress(randomChosenColour);
    playSound(randomChosenColour);
}


function checkAnswer(currentLevel, gamePattern, userClickedPattern) {
        var rightAnswerCount = 0;

        for (i = 0; i < userClickedPattern.length; i++) {
            if (gamePattern[i] !== userClickedPattern[i]) {
                playSound("wrong");
                $("body").toggleClass("game-over");
                setTimeout(function() {
                    $("body").toggleClass("game-over");
                }, 200);
                $("h1").text("Game over, Press Any Key to Restart.")
                startOver();
            } else {
                rightAnswerCount++;
            }
        }

        if (gamePattern.length === userClickedPattern.length) {
            if (rightAnswerCount === currentLevel) {
                setTimeout(nextSequence, 1000)    
            }
        }
}




$(".btn").click(function(event) {
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(level, gamePattern, userClickedPattern)
});

$(document).keypress(function() {
    if (!started) {
        nextSequence();
        started = true;
    }
});