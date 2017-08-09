


function HangmanGame(canvasElement, w, h) {
  //Set up canvas
  this.canvas = canvasElement,////document.getElementById('gameCanvas'),
  this.context = this.canvas.getContext('2d'),//canvas.getContext('2d'),

  this.width = w,//document.getElementById('gameCanvas').offsetWidth,
  this.height = h,//document.getElementById('gameCanvas').offsetHeight,

  //Draw welcome message and set gamestate.
  this.gamestate = 0,
  //Array of previously guessed letters.
  this.guessed = [],
  //x-coord for live line of type.
  this.cursor = 100,
  //Store the random word.
  this.word = '',
  //store how long the word is to track when user has won
  this.wordLength = 0,
  
  //Setup
    this.run = function() {
    this.context.font = 'italic 30pt Sans-Serif';
    this.context.fillText('Welcome to hangman', 100, 60);
    this.context.font = '20pt Monospace';
    this.word = this.pickword(dictionary);
  
    //Uncomment for testing:
    // var word = "poppy";

    this.drawgallows(this.gamestate);
    this.drawboard([100, 500], this.word);

    //How many unrevealed letters there are.
    console.log(this.wordLength);
    this.wordLength = this.word.length;

    //If the input is allowed and the game is still going, respond to guesses.
    //Run the game.
    document.onkeydown = function (event) {
      if (allowedInput.indexOf(event.key) != -1 && gamestate < 5) {
        this.updateBoard(event.key);
        this.context.fillText(event.key, cursor, 550);
        cursor += 20;
      }
    }
  }



  //Test the guess and draw updates
  this.updateBoard = function(userGuess) {
    userIndex = word.indexOf(userGuess);

    //If the userguess matches and hasn't been guessed before.
    if  (this.wordLength > 0 && userIndex != -1 && guessed.indexOf(userGuess) == -1) {
      guessed.push(userGuess);
      this.wordLength--;
      //Draw the first index
      this.context.fillText(word[userIndex], (100 + (userIndex * 20)), 490);

      //Go through all rest of the letters in word.
      for (var z = userIndex + 1; z < word.length; z++) {
        //Draw other occurrences of the letter.
        if (word[z] == userGuess) {
          this.context.fillText(word[z], (100 + (z * 20)), 490);
          this.wordLength--;
        }
      }
    } else if  (this.wordLength > 0 && userIndex == -1) {
      gamestate++;
      drawgallows(gamestate);
    }
    //Add the guess to the previous guessed array.
    if  (this.wordLength > 0 && guessed.indexOf(userGuess) == -1) {
      guessed.push(userGuess);
    }

    //Check for win state.
    if  (this.wordLength == 0) {
      this.context.fillText("Winner!", 350, 300);
       this.wordLength--;
    }
  },

  //Draws an empty board of appropriate length.
   this.drawboard = function(location, word) {
    for (var i = 0; i < word.length; i++) {
      this.context.fillText('_ ', (location[0] + i * 20), location[1]);
    }
  },

  //Draws and updates the gallows based on gamestate
   this.drawgallows = function(gamestate) {
    if (gamestate == 0) { //basic setup
      this.drawrect([100, 100], 15, 300);
      this.drawrect([115, 100], 150, 15);
      this.drawline([265, 115], [265, 150]);
      this.context.beginPath();
      this.context.arc(265, 170, 20, 0, 2 * Math.PI);
      this.context.stroke();
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
      this.context.fillText("You lose...", 350, 300);
      this.context.fillText("The word was: ", 350, 350);
      this.context.fillText(word, 350, 400);
    }
  },
  //Pick a random word from the dictionary.
   this.pickword = function(dictionary) {
    return dictionary[Math.floor(Math.random() * (dictionary.length))];
  },

  //Draw a line, from and to are a pair of coords [x,y]
   this.drawline = function(from, to) {
    this.context.beginPath();
    this.context.moveTo(from[0], from[1]);
    this.context.lineTo(to[0], to[1]);
    this.context.stroke();
  },
  //Draw a rectange of height and width from top left corner position. 
  //Accepts ([x,y], w, h) for position, width, and height.
   this.drawrect = function(position, width, height) {
    this.context.beginPath();
    this.context.moveTo(position[0], position[1]);
    this.context.lineTo(position[0] + width, position[1]);
    this.context.lineTo(position[0] + width, position[1] + height);
    this.context.lineTo(position[0], position[1] + height);
    this.context.lineTo(position[0], position[1]);
    this.context.stroke();
  },
  //Draw a grid
   this.drawGrid = function() {
    for (var i = 0; i < 6; i++) {
      drawline([i * 100, 0], [i * 100, height]);
    }

    for (var i = 0; i < 6; i++) {
      drawline([0, i * 100], [width, i * 100]);
    }
  }
}


var mygame = new HangmanGame(
  document.getElementById('gameCanvas'),
  document.getElementById('gameCanvas').offsetWidth,
  document.getElementById('gameCanvas').offsetHeight
);
mygame.run();

var obj = {
  foo() {
    console.log("foo");
  },
  bar() {
    console.log("bar");
  }
};

obj.foo();