var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var started = false; // pehle false kar dia kee pehle chance mein chlega 
var level = 0;  
function startover(){
    started=false;  // jaise hee wrong hua sab starting se shuru hoga ,,userclickpattern isliye nhi kiya kyumki woh aone aap hee ho raha hien nextSequnec me 
    level=0;
    gamePattern=[];
  
  } 
  var bgMusic = new Audio("sounds/contra_jungle.mp3"); //globaly declare kar dia
  bgMusic.volume = 0.2; // Adjust volume (0.0 to 1.0)
  bgMusic.loop=true;  // continuosly chlega
  //bg sound
  document.addEventListener("DOMContentLoaded", function() {
    
    // Play audio when the user clicks anywhere
    document.body.addEventListener("keypress", function() {
      if (!started && bgMusic.paused) {
        bgMusic.play();
      }
    });
  });
  
$(document).keypress( function(){
    if (!started){
     $("#level-title").text("Level"+level);
     nextSequence();
     started=true;  // true kar dia ttaki dubara na chle start wali 
     bgMusic.currentTime=0; //starting se clega gaana na kee beech se 
     bgMusic.play();
    }
});
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel])
    {
        // ab success mil gyi ab check karo kee sequence mein hien pura mtlb length check karo 
        if(gamePattern.length==userClickedPattern.length){
            // 1000milisecond ke baad nya patten mtlb lavel clear ho gya 
            setTimeout(function()
            {
            nextSequence()
            }, 1000);
        }
    }
    else{
        playSound();  // default chl gya . no parameter passed
        bgMusic.pause();
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");  // jquery method isliye addClass likha hein nakee classList
        setTimeout(function(){
            document.querySelector("body").classList.remove("game-over"); // vanilla js method used to implement dom element 
        },200);     
        startover();   
    }

}
var userClickedPattern=[];
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1); //because hum last wala dekh rahein woh sahi mtlb good pattern
});
function nextSequence(){
    // jaise hee nya sequence bnega 
    userClickedPattern=[]; //nya userclick pattern bnega aur woh ohir se satring tak ka sequence store karega 
    level++;// level increament ho gya 
    $("#level-title").text("Level "+ level);
    var randomNumber=Math.random();
    randomNumber=randomNumber*4;  ///becaue 4 dabbe hein [0->3]
    randomNumber=Math.floor(randomNumber);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+ randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
}
function playSound(color){
switch(color){
    case"red":
    var red=new Audio("sounds/red.mp3");
    red.play();
    break;
    case"yellow":
    var yellow=new Audio("sounds/yellow.mp3");
    yellow.play();
    break;
    case"green":
    var green=new Audio("sounds/green.mp3");
    green.play();
    break;
    case"blue":
    var blue=new Audio("sounds/blue.mp3");
    blue.play();
    break;
    default:
   var wrong=new Audio("sounds/mario_game_over_sms.mp3");
   bgMusic.pause();  // gameover chle jab tak bgmusic rok di ,fir start ho raha h toh woh apne aap bj raha h 
   wrong.play();
   break;
}
}
function animatePress(currentColor){
var activeButton=document.querySelector("#"+ currentColor);
activeButton.classList.add("pressed");
setTimeout(function(){
    activeButton.classList.remove("pressed")
},100);
}
