var colours = ["green", "red", "yellow", "blue"];
var randomColorSeq = [];
var userColorSeq = [];
var level = 0;
var started = false;

function sequence() {
  return Math.floor(Math.random() * 4);
}



function sound(key) {
  switch (key) {
    case "b":
      var audio = new Audio('sounds/blue.mp3');
      audio.play();

      break;

    case "g":
      var audio = new Audio('sounds/green.mp3');
      audio.play();

      break;

    case "r":
      var audio = new Audio('sounds/red.mp3');
      audio.play();

      break;
    case "y":
      var audio = new Audio('sounds/yellow.mp3');
      audio.play();

      break;
    default:
      var audio = new Audio('sounds/wrong.mp3');
      audio.play();

  }
}

function blink(id) {
  $("#" + id).addClass("pressed");

  setTimeout(function() {
    $("#" + id).removeClass("pressed");
  }, 100);
}


// Step1
$(document).on("keydown", function() {
  if(!started){
    setTimeout(randomSeq, 100);
    started = true;
  }
});


// Step2
function randomSeq() {
  $("h1").text("LEVEL- " + level);
  level++;
  var randomNum = sequence();
  randomColorSeq.push(colours[randomNum]);

  $("." + colours[randomNum]).fadeOut(100).fadeIn(100);
  sound(colours[randomNum][0]);
}

// Step3
var currLevel = 0;

$(".tile").on("click", function() {

  var userColor = this.id;
  $("#" + this.id).fadeOut(100).fadeIn(100);
  sound(userColor);
  userColorSeq.push(userColor);

  var currLevel = userColorSeq.length-1;
  correctSeq(currLevel);
  // blink(userColor);

});


// Step4
function correctSeq(i) {
    if (userColorSeq[i] != randomColorSeq[i][0]){
      restart();
    }else{
      if(userColorSeq.length === randomColorSeq.length){
        setTimeout(function(){
          randomSeq();
        },200);
      }
    }

}

// Step5
function restart() {
  started = false;
  level = 0;
  randomColorSeq=[];
  userColorSeq=[];

  $("h1").text("GAME OVER😒");

  setTimeout(function () {
    $("h1").text("It's okay, Press a Key to Restart!💪");
  }, 1000);




  $("body").addClass("over");

  var audio = new Audio('sounds/wrong.mp3');
  audio.play();

  setTimeout(function(){
    $("body").removeClass("over");
  },200);

}
