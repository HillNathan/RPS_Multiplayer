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
var database = firebase.database();
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
  resultDisp: $("#result"),
  localPlayer: "",
  stage: "waitingP1",
  prevResult: "",
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

$("#p1-buttons").hide();
$("#p2-buttons").hide();

database.ref().on("value", function(snapshot) {

  player1 = snapshot.child('player1').val();
  player2 = snapshot.child('player2').val();

  if (player1.assigned && player2.assigned) {
    console.log(gameObj.prevResult);

    if (gameObj.prevResult === "tied") {
      gameObj.resultDisp.text("The game was a tie!");
    }
    if (gameObj.prevResult === "player1") {
      gameObj.resultDisp.text("Player 1 is the winner!");
    }
    if (gameObj.prevResult === "player2") {
      gameObj.resultDisp.text("Player 2 is the winner!");
    }
    gameObj.startForm.hide();
    gameObj.infoDisp.text("Waiting on both players to make a choice");
    gameObj.stage = "active";
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
      console.log("find a winner");
      var winner = determineWinner(player1.throw, player2.throw);
      console.log(winner);
        if (winner === "player1") {
          gameObj.prevResult = "player1";
          player1.wins++
          player2.losses++
          player1.throw = "";
          player2.throw = "";
          database.ref().update({player1, player2, winner});
        }
        else if (winner === "player2") {
          gameObj.prevResult = "player2";
          player1.losses++
          player2.wins++  
          player1.throw = "";
          player2.throw = "";
          database.ref().update({player1, player2,winner});
        }
        else {
          gameObj.infoDisp.text("It is a tie!");
          gameObj.prevResult = "tied"
          player1.throw = "";
          player2.throw = "";
          database.ref().update({player1, player2, winner});
        }
    }
  }

  if (!player1.assigned && player2.assigned) {
    console.log("have player2 need player 1")
    displayStuff();
  }

  if (player1.assigned && !player2.assigned) {
    console.log("have player1 need player 2");
    displayStuff();
  }

  if (!player1.assigned && !player2.assigned) {
    console.log("need both players");
    displayStuff(); 
  }

if (gameObj.localPlayer === "player1") {
    displayStuff();
    $("#p2-buttons").hide();
    gameObj.startForm.hide();
  }
  else if (gameObj.localPlayer === "player2") {
    displayStuff();
    $("#p1-buttons").hide();
    gameObj.startForm.hide();
  } 

});

gameObj.startButton.on('click', function(){
  if (!player1.assigned) {
    player1.assigned = true;
    player1.name = $("#my-name").val();
    player1.wins = 0;
    player1.losses = 0;
    gameObj.stage = "waitingP2";
    gameObj.localPlayer = "player1";

    database.ref().update({
      player1
    })
    $("#p1-buttons").show();
    
  }
  else {
    player2.assigned = true;
    player2.name = $("#my-name").val();
    player2.wins = 0;
    player2.losses = 0;
    gameObj.stage = "activeGame";
    gameObj.localPlayer = "player2";
    //show player 2 buttons

    database.ref().update({
      player2
    })

    gameObj.startForm.hide();
    gameObj.infoDisp.text("Waiting on both players to make a choice");
    $("#p2-buttons").show();

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

  database.ref('player1').update({
    throw: player1.throw,
  })
  
});

  $(".game-button-2").on('click', function() {
    player2.throw = $(this).val();
    
  console.log(player1.throw);
  console.log(player2.throw);

  database.ref('player2').update({
    throw: player2.throw,
  })

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
  if (gameObj.localPlayer = "player1") {
    player1.name = "";
    player1.wins = 0;
    player1.losses = 0;
    player1.throw = "";
    player1.assigned = false;

    database.ref().update(player1);

}
if (gameObj.localPlayer = "player2") {
  player2.name = "";
  player2.wins = 0;
  player2.losses = 0;
  player2.throw = "";
  player2.assigned = false;

  database.ref().update(player2);
}
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