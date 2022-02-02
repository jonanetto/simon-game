var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keydown(function () { 
  if(!started){
    $("#level-title").text("Level" + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () { // Event Listener para ver cuando den click el atributo del id del color que pulso

  var userChosenColour = $(this).attr("id"); // Guardo en la variable userChosenColour el color sobre el que dió click
  userClickedPattern.push(userChosenColour); // Guardo dentro del arreglo userClickedPattern el color seleccionado por el usuario
  
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){

  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game over, Press Any Key to Restart");

      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);
      
      startOver();
    }
  }


// Genera un numero del 0 al 3
function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4); // Generar numero random para luego seleccionar color
  var randomChosenColour = buttonColours[randomNumber]; // Seleccionar color con el numero random
  gamePattern.push(randomChosenColour); // Poner el color dentro del arreglo de gamePattern.
  
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); // Efecto Flash o fade
  playSound(randomChosenColour);
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");

  // After 100ms remove the class
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3"); 
  audio.play();
}


function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}