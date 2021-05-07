var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var executed = false;
var level = 0;

$(document).ready(function () {
    $(document).keydown(function (e) {
        if(!executed) {
            randomSequence();
            executed = true;
        }
    });
    
    $(".btn").click(function (e) { 
        e.preventDefault();
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);

        playSound(userChosenColour);
        animateClass("#" + userChosenColour, "pressed", 100);
        //AQUI MUERE EL REINICIO
        // console.log(userClickedPattern.length, gamePattern.length);
        setTimeout(function(){
            if(userClickedPattern.length === gamePattern.length)
                if (checkAnswer()){
                    console.log("Success!");
                    setTimeout(randomSequence, 1000);
                }
                else{
                    console.log("Wrong!");
                    playSound("wrong");
                    animateClass("body", "game-over", 1000);
                    $(document).keydown(function (e) { 
                        startOver();
                    });
                }
        }, 400);
    });

    function randomSequence(){
        $("#level-title").html("Level " + level++);
        userClickedPattern = [];
        var randomNumber = Math.floor(Math.random()*4);
        var randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);
        console.log(gamePattern);
        animateClass("#" + randomChosenColour, "pressed", 500);
        playSound(randomChosenColour);
    }
    
    function animateClass(chosenElement, clase, delay){
        $(chosenElement).addClass(clase);
        setTimeout(function(){
            $(chosenElement).removeClass(clase);
        }, delay);
        if(clase === "game-over"){
            $("#level-title").text("Game Over!");
            $("<h2 class='go-h2'>Press Any Key to Restart</h2>").insertAfter("h1");
        }
    }
    
    function playSound(name){
        var audio = new Audio("sounds/" + name + ".mp3").play();
    }
    
    function checkAnswer(){
        console.log("user: " + userClickedPattern);
        console.log("game: " + gamePattern);
        for(var i=0; i<userClickedPattern.length; i++){
            if(userClickedPattern[i] != gamePattern[i]){
                return false;
            }
        }
        return true;
    }
    
    function startOver(){
        //NO SIRVE =(
        // $("h1").text("Press A Key to Start");
        // $("h2").remove();
        // level = 0;
        // gamePattern = [];
        // executed = false;
        location.reload();
    }
});