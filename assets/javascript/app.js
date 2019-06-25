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
var gameDBRef = firebase.database().ref();
console.log(gameDBRef);
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
var legalChoices = ["ROCK", "PAPER", "SCISSORS"];

// Wrap all the rest of the game code in document.ready function. 
$(document).ready(function() {
  var gameObj = {
    localPlayer: {
      //playerNum will be 'player1' or 'player2' to interact with the firebase DB
      playerNum: "",
      assigned: false,
      playerName: "",
      wins: 0,
      losses: 0,
      myChoice: "",
      displayName: $("#local-name"),
  },
  
  remotePlayer: {
    //playerNum will be 'player1' or 'player2' to interact with the firebase DB
    playerNum: "",
    assigned: false,
    playerName: "",
    wins: 0,
    losses: 0,
    myChoice: "",
    displayName: $("#player2-name"),
  },
  
  gameButton: $(".game-button"),
  startButton: $("#start-btn")
  
  
  }

gameObj.startButton.on("click", function() {
  gameObj.localPlayer.playerName = $("#my-name").val().trim();
  console.log(gameObj.localPlayer.playerName)
  gameObj.localPlayer.displayName.text(gameObj.localPlayer.playerName);
  
});









});
