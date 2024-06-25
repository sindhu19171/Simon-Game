//alert("HELLO!!");
var buttonColors=["red","blue","green","yellow"];

var pattern=[];
var userPattern=[];

var started=false;
var level=0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});

$(".btn").on("click",function(){
    var userChosenColor=$(this).attr("id");
    userPattern.push(userChosenColor);

    playsound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userPattern.length-1);
});

function checkAnswer(currLevel){
    if(pattern[currLevel]===userPattern[currLevel]){
        if (userPattern.length === pattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    }
    else{
        
        playsound("wrong");

        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
        
        startOver();
    }
}

function nextSequence(){

    userPattern=[];

    level++;
    //console.log(level);

    $("#level-title").text("Level "+level);

    var n=Math.random()*4;
    var randNumber=Math.floor(n);
    var choosenColor=buttonColors[randNumber];
    pattern.push(choosenColor);

    $("#"+choosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(choosenColor);
}

function playsound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass(".pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver(){
    pattern=[];
    level=0;
    started=false;
}
