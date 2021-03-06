function formSubmission(game) {
  var thisGuess = $('#players-input').val();

  $('#players-input').val('');
  var output = game.playersGuessSubmission(parseInt(thisGuess, 10));

  $('#headers h1').text(output);
}



$(document).ready(function(){

  var thisGame = new Game();

  $('#submit').on('click', function(){
    formSubmission(thisGame);
  })

  $('#players-input').on('keyup', function(){
    if ( event.which == 13 ) {
      formSubmission(thisGame);
    }
  })

})


























var Game = function() {
    this.playersGuess = null;
    this.winningNumber = generateWinningNumber();
    this.pastGuesses = [];
}

function generateWinningNumber() {
    return Math.ceil(Math.random()*100);
}


function newGame() {
    return new Game(); //check that old game !== new game
}

Game.prototype.difference = function() {
    return Math.abs(this.playersGuess-this.winningNumber);
}

Game.prototype.isLower = function() {
    return this.playersGuess < this.winningNumber;
}

Game.prototype.playersGuessSubmission = function(guess) {
    if(typeof guess !== 'number' || guess < 1 || guess > 100) {
        throw "That is an invalid guess.";
    }
    this.playersGuess = guess;
    return this.checkGuess();
}

Game.prototype.checkGuess = function() {
    if(this.pastGuesses.length >= 5) {
        return 'You lose, stop trying...'
    }
    else {
        if(this.pastGuesses.indexOf(this.playersGuess) > -1) {
            return 'You have already guessed that number.';
        }
        else {
            this.pastGuesses.push(this.playersGuess);
            $('#guess-list li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);
            if(this.playersGuess===this.winningNumber) {
                return 'You Win!';
            }
            else {
                var diff = this.difference();
                if(diff < 5) return'You\'re burning up!';
                else if(diff < 12) return'You\'re lukewarm.';
                else if(diff < 25) return'You\'re a bit chilly.';
                else if(diff < 50) return'You\'re V chilly.';
                else return'You\'re ice cold!';
            }
        }
    }
}

Game.prototype.provideHint = function() {
    var hintArray = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
    return shuffle(hintArray);
}

function shuffle(arr) { //Fisher-Yates - https://bost.ocks.org/mike/shuffle/
   for(var i = arr.length-1; i > 0; i--) {
       var randomIndex = Math.floor(Math.random() * (i + 1));
       var temp = arr[i];
       arr[i] = arr[randomIndex];
       arr[randomIndex] = temp;
    }
    return arr;
}
