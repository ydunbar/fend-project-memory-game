
// With help from tutorial by Mike Wales: https://www.youtube.com/watch?reload=9&reload=9&v=_rUH-sEs68Y&app=desktop
// and tutorial by Sandra Israel-Ovirih: https://scotch.io/tutorials/how-to-build-a-memory-matching-game-in-javascript

/*
 * Create a list that holds all of your cards
 */

const cards = [
  "fa-diamond",
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-anchor",
  "fa-bolt",
  "fa-bolt",
  "fa-cube",
  "fa-cube",
  "fa-leaf",
  "fa-leaf",
  "fa-bomb",
  "fa-bomb",
  "fa-bicycle",
  "fa-bicycle"
];

// Variables and arrays
const allCards = document.querySelectorAll('.card');
let openCards = [];
let matchCards = [];
// Timer variables
let second = 0;
let minute = 0;
const timer = document.querySelector(".timer");
var interval;
// move counter and star rating variables
const moveCounter = document.querySelector('.moves');
let moves = 0;
moveCounter.innerHTML = moves;
const stars = document.querySelector('.stars').children;
let starCount = 3;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 // Function that returns HTML for card
function createCard(card) {
  return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Start game; adds shuffled result of createCard into innerHTML of deck, adding cards programmatically
function startGame() {
  var deck = document.querySelector('.deck');
  var cardHTML = shuffle(cards).map(function(card) {
    return createCard(card);
  });
  deck.innerHTML = cardHTML.join('');
}

startGame();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// Add to move counter
function addMove() {
	moves++;
	moveCounter.innerHTML = moves;
	// start timer
    if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }
	// Star rating based on moves
    if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

// Timer
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = `<i class='fa fa-clock-o'></i> ${minute}:${second}`;
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}


//Function that compares card data and adds open, show and match classes, adds to matchCards array, then clears openCards array
function matchCheck() {
  if(openCards[0].dataset.card == openCards[1].dataset.card) {
    openCards[0].classList.add('match', 'open', 'show');
    openCards[1].classList.add('match', 'open', 'show');
    matchCards.push(openCards[0]);
    matchCards.push(openCards[1]);
    openCards = [];
  }
  // If not a match, hide and clear openCards array
  else {
    setTimeout(function() {
    openCards.forEach(function(card) {
      card.classList.remove('open', 'show');
    });
    openCards = [];
  },800);}
}

 // Adds event listener to each card, toggles classes, calls matchCheck
allCards.forEach(function(card) {
  card.addEventListener('click', function(e) {
    if(!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match') && openCards.length < 2) {
    	openCards.push(card);
      card.classList.add('open', 'show');
      if(openCards.length == 2) {
        matchCheck();
        addMove();
      }
    }
  });
});
