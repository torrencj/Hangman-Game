


function HangmanGame(canvasElement) {
  //Set up vars
  var context = canvasElement.getContext('2d');
  var gamestate = 0;
  var guessed = [];
  var lettersRemaining;
  var cursor = 100;   //x-coord for live line of type.
  var word = '';

  //run the game
  this.run = function() {
    context.font = 'italic 30pt Sans-Serif';
    context.fillText('Welcome to hangman', 100, 60);
    context.font = '20pt Monospace';
    word = pickword(dictionary);

    //Uncomment for testing:
    // word = "poppy";

    console.log("Psst.... don't tell him, it's: " + word); //For cheaters or the lazy.

    drawgallows(gamestate);
    drawboard([100, 500], word);

    //How many unrevealed letters there are.
    lettersRemaining = word.length;
    console.log("initial word length: " + lettersRemaining);

    //If the input is allowed and the game is still going, respond to guesses.
    document.onkeydown = function (event) {
      if (allowedInput.indexOf(event.key) != -1 && gamestate < 5) {
        updateBoard(event.key);
        if (lettersRemaining < 1) {
          context.fillText("Winner!", 350, 300);
        }
      }
    };
  } //End of run function

  function isNew(guess) {
    if (guessed.indexOf(guess) == -1) {
      return true;
    } else {
      return false;
    }
  }

  function isMatch(guess) {
    if (word.indexOf(guess) != -1) {
      return true;
    } else {
      return false;
    }
  }

  //Draw occurrences of the letter and subtract letters remaining for each
  function reveal(guess) {
    for (var z = 0; z < word.length; z++) {
      if (word[z] == guess) {
        context.fillText(word[z], (100 + (z * 20)), 490);
        lettersRemaining--;
        console.log("reveal: " + lettersRemaining);
      }
    }
  }

  //Test the guess and draw updates
  function updateBoard(guess) {

    if (lettersRemaining > 0) {
      if (isNew(guess)) {
        context.fillText(event.key, cursor, 550);
        cursor += 20;
        if (isMatch(guess)) {
          reveal(guess);
          guessed.push(guess);
        } else {
          guessed.push(guess);
          gamestate++;
          drawgallows(gamestate);
        }
      }
    }
  }

  //Draws an empty board of appropriate length.
  function drawboard(location, word) {
    for (var i = 0; i < word.length; i++) {
      context.fillText('_ ', (location[0] + i * 20), location[1]);
    }
  }

  //Draws and updates the gallows based on gamestate
  function drawgallows(gamestate) {
    if (gamestate == 0) { //basic setup
      drawrect([100, 100], 15, 300);
      drawrect([115, 100], 150, 15);
      drawline([265, 115], [265, 150]);
      context.beginPath();
      context.arc(265, 170, 20, 0, 2 * Math.PI);
      context.stroke();
    } else if (gamestate == 1) {
      drawline([265, 190], [265, 250]); //body
    } else if (gamestate == 2) {
      drawline([265, 190], [235, 250]); //left arm
    } else if (gamestate == 3) {
      drawline([265, 190], [295, 250]); //right arm
    } else if (gamestate == 4) {
      drawline([265, 250], [235, 300]); //left leg
    } else if (gamestate == 5) {
      drawline([265, 250], [295, 300]); //right leg (and loss)
      context.fillText("You lose...", 350, 300);
      context.fillText("The word was: ", 350, 350);
      context.fillText(word, 350, 400);
    }
  }

  //Pick a random word from the dictionary.
  function pickword(dictionary) {
    return dictionary[Math.floor(Math.random() * (dictionary.length - 1))];
  }

  //Draw a line, from and to are a pair of coords [x,y]
  function drawline(from, to) {
    context.beginPath();
    context.moveTo(from[0], from[1]);
    context.lineTo(to[0], to[1]);
    context.stroke();
  }

  //Draw a rectange of height and width from top left corner position. 
  //Accepts ([x,y], w, h) for position, width, and height.
  function drawrect(position, width, height) {
    context.beginPath();
    context.moveTo(position[0], position[1]);
    context.lineTo(position[0] + width, position[1]);
    context.lineTo(position[0] + width, position[1] + height);
    context.lineTo(position[0], position[1] + height);
    context.lineTo(position[0], position[1]);
    context.stroke();
  }

  //Draw a grid
  function drawGrid() {
    for (var i = 0; i < 6; i++) {
      drawline([i * 100, 0], [i * 100, height]);
    }
    for (var i = 0; i < 6; i++) {
      drawline([0, i * 100], [width, i * 100]);
    }
  }

}


var mygame = new HangmanGame(
  document.getElementById('gameCanvas')
);
mygame.run();
