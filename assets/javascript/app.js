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
var legalChoices = ["ROCK", "PAPER", "SCISSORS"];

// Wrap all the rest of the game code in document.ready function. 
$(document).ready(function() {
  var gameObj = {
    // localPlayer and remotePlayer align exactly to the firebase object for the game. 
    localPlayer: {
      assigned: false,
      name: "",
      wins: 0,
      losses: 0,
      throw: "",
  },
  
    remotePlayer: {
      assigned: false,
      name: "",
      wins: 0,
      losses: 0,
      throw: "",
    },
  
  gameButton: $(".game-button"),
  startButton: $("#start-btn"),
  dispLocalName: $("#local-name"),
  dispRemoteName: $("#remote-name"),
  
  }

  // Some click functions for all of our buttons...

  // click function for the start button after entering local player info
  gameObj.startButton.on("click", function() {
    
    // grab the players name to the local object
    gameObj.localPlayer.name = $("#my-name").val().trim();

    // display it in the appropriate div on the page
    gameObj.dispLocalName.text(gameObj.localPlayer.name);

    // add it to the appropriate database object
    // LocalPlayerPath.update({
      // name: gameObj.localPlayer.name.
      //})

  });

  // click function for the game buttons to choose Rock/Paper/Scissors
  gameObj.gameButton.on('click', function(){

    // grab the throw from the button value (set in the html tags)
    // will be only "ROCK" "PAPER" or "SCISSORS" in all caps
    gameObj.localPlayer.throw = $(this).val();

    // add it to the appropriate database object
    // LocalPlayerPath.update({
      // throw: gameObj.localPlayer.throw.
      //})
  })






});
