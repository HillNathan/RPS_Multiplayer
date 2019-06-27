// initializing the firebase data connection before i run any other Javascript
var firebaseConfig = {
    apiKey: "AIzaSyDsWM6lji0aM1YUdJQmxn1n8z_62PsyLPE",
    authDomain: "firstfirebase-5e128.firebaseapp.com",
    databaseURL: "https://firstfirebase-5e128.firebaseio.com",
    projectId: "firstfirebase-5e128",
    storageBucket: "",
    messagingSenderId: "359317076742",
    appId: "1:359317076742:web:13c1e062788a0829"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
// --------------------------------------------------------------------------------
// Now we set up the database reference:
var gameDB = firebase.database();
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

// Wrap all the rest of the game code in document.ready function. 
$(document).ready(function() {
  
var gameObj = {
  gameButton: $(".game-button"),
  startButton: $("#start-btn"),
  startForm: $("#start-form"),
  // display key-pairs
  p1NameDisp: $("#p1-name"),
  p1WinsDisp: $("#p1-wins"), 
  p1LossDisp: $("#p1-losses"),

  p2NameDisp: $("#p2-name"),
  p2WinsDisp: $("#p2-wins"),
  p2LossDisp: $("#p2-losses"),

  infoDisp: $("#info"),

  stage: "waitingP1",

}
  
var player1 = {
  name: "",
  assigned: false,
  wins: 0,
  losses: 0,
  throw: "",
};

var player2 = {
  name: "",
  assigned: false,
  wins: 0,
  losses: 0,
  throw: "",
}















gameObj.startButton.on('click', function(){
  if (gameObj.stage === "waitingP1") {
    player1.assigned = true;
    player1.name = $("#my-name").val();
    player1.wins = 0;
    player1.losses = 0;
    gameObj.stage = "waitingP2";
    //show player1 buttons
  }
  else {
    player2.assigned = true;
    player2.name = $("#my-name").val();
    player2.wins = 0;
    player2.losses = 0;
    gameObj.stage = "activeGame";
    //show player 2 buttons
    gameObj.startForm.toggle();
    gameObj.infoDisp.text("Waiting on both players to make a choice");

  };
  console.log("game state: " + gameObj.stage)

  console.log(player1);
  console.log(player2);

  displayStuff();

});

gameObj.gameButton.on('click', function() {
  player1.throw = $(this).val();

  console.log(player1.throw);
  console.log(player2.throw);

  var temp = (player1.throw !== "")
  console.log(temp);
  temp = (player2.throw === "");
  console.log(temp);

  if (player1.throw === "" && player2.throw === "") {
    gameObj.infoDisp.text("Waiting on both players to make a choice");
  }
  else if ((player1.throw !== "") && (player2.throw === "")) {
    gameObj.infoDisp.text("Waiting on player two to make a choice");
  }
  else if (player1.throw === "" && player2.throw !== "") {
    gameObj.infoDisp.text("Waiting on player one to make a choice");
  }
  else {
    var winner = determineWinner(player1.throw, player2.throw);
      if (winner === "player1") {
        gameObj.infoDisp.text("Player 1 is the winner!");
        player1.wins++
        player2.losses++
        player1.throw = "";
        player2.throw = "";
      }
      else if (winner === "player2") {
        gameObj.infoDisp.text("Player2 is the winner!");
        player1.losses++
        player2.wins++
        player1.throw = "";
        player2.throw = "";
      }
      else {
        gameObj.infoDisp.text("It is a tie!");
        player1.throw = "";
        player2.throw = "";
      }
  }
});

  $(".game-button-2").on('click', function() {
    player2.throw = $(this).val();
    
  console.log(player1.throw);
  console.log(player2.throw);

    if (player1.throw === "" && player2.throw === "") {
      gameObj.infoDisp.text("Waiting on both players to make a choice");
    }
    else if (player1.throw !== "" && player2.throw === "") {
      gameObj.infoDisp.text("Waiting on player two to make a choice");
    }
    else if (player1.throw === "" && player2.throw !== "") {
      gameObj.infoDisp.text("Waiting on player one to make a choice");
    }
    else {
      var winner = determineWinner(player1.throw, player2.throw);
      if (winner === "player1") {
        gameObj.infoDisp.text("Player 1 is the winner!");
        player1.wins++
        player2.losses++
        player1.throw = "";
        player2.throw = "";
      }
      else if (winner === "player2") {
        gameObj.infoDisp.text("Player2 is the winner!");
        player1.losses++
        player2.wins++
        player1.throw = "";
        player2.throw = "";
      }
      else {
        gameObj.infoDisp.text("It is a tie!");
        player1.throw = "";
        player2.throw = "";
      }
    }
    displayStuff();
  });


function displayStuff() {
  gameObj.p1NameDisp.text(player1.name);
  gameObj.p1WinsDisp.text(player1.wins);
  gameObj.p1LossDisp.text(player1.losses);

  gameObj.p2NameDisp.text(player2.name);
  gameObj.p2WinsDisp.text(player2.wins);
  gameObj.p2LossDisp.text(player2.losses)
}


});

$(window).on("unload", function() {
  // Do Something when the window closes - i.e. remove the local player from the database and reset it to wait for another user. 
});


function determineWinner(choice1, choice2) {
  if (choice1 === choice2) {
    return "tied";
  }

  if (choice1 === "ROCK") {
    if (choice2 === "PAPER") {
      return "player2"
    }
    else {
      return "player1"
    }
  } else 
  if (choice1 === "PAPER") {
    if (choice2 === "ROCK") {
      return "player1";
    }
    else {
      return "player2"
    }
  }
  else { // choice1 is SCISSORS
    if (choice2 === "ROCK") {
      return "player2";
    }
    else {
      return "player1";
    }
  }



}