//Game materials:
var gameReady = false;
var level = 0;
var buttonColours = ["green","red","yellow","blue",]
var gamePattern = [];
var userClickedPattern = [];

//Game functions:
function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(name) {
    let clickedButton = $("#" + name);
    clickedButton.addClass("pressed");

    setTimeout(function() {
        clickedButton.removeClass("pressed");
    }, 100);
}
    

function nextSequence() {
    userClickedPattern = []; // Clear previous user clicks at the start of a new round
    level++;
    $("#level-title").text("Level " + level); // ✅ Update level title

    const randomNumber = Math.floor(Math.random() * buttonColours.length);
    const randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function checkAnswer(currentIndex) {
    if (userClickedPattern[currentIndex] !== gamePattern[currentIndex]) {
        // ❌ Wrong input — game over
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    } else {
        // ✅ Correct so far
        if (userClickedPattern.length === gamePattern.length) {
            // If full pattern matched, go to next level
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameReady = false; // <--- This is KEY!
}
//Gameplay
//1. Press a key to start game
document.addEventListener('keydown', function() {
    if (!gameReady) {
        nextSequence();
        document.querySelector('h1').innerHTML = 'Level ' + level;
        gameReady = true;
    }
})

//2. Handle player input
$('.btn').on('click', function() {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1); // ✅ Pass in latest index
});

//3. Check answer
