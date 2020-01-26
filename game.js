var gamePattern=[];

var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;
var started = false;


$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

})

//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      playSound("wrong")
      $("#level-title").text("Game Over! Press any key to restart.");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      startOver();

    }

}


function playSound(name) {
  var audioName = new Audio("sounds/" + name + ".mp3");
  audioName.play();
}


function animatePress(currentColour) {
  $("#"+currentColour).addClass("currentColour");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

//Start game










function nextSequence() {
  userClickedPattern = [];
  level++;


  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random()*4);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();

}


function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
