const cards = document.querySelectorAll('.card');
const deck = document.querySelector('.deck');
let matchedCards = [];
let flippedCards = [];
let moves = 0;
let clockOff = true;
let seconds = 0;
let minutes = 0;
let timer;


/* When card is clicked, start the timer, flip the card, push it to the array and check for matches. Also count the moves and check the score to keep track of star rating. */
deck.addEventListener('click', event => {
    const clickTarget = event.target;
    if (clickConditionals(clickTarget)) {
        if (clockOff) {
            startTimer();
            clockOff = false;
        }
        flipCard(clickTarget);
        addFlippedCard(clickTarget);
        if (flippedCards.length === 2) {
            findMatches(clickTarget);
            moveCounter();
            checkScore();
        }
    }
    // Once all 16 cards have been matched and pushed to the matchedCards array, the game is over
    if (matchedCards.length === 16) {
        gameOver();
    }
});

// Turn the card over and show the icon
function flipCard(card) {
    card.classList.toggle('open');
    card.classList.toggle('show');
}

// Add the flipped card to the flippedCards array
function addFlippedCard(clickTarget) {
    flippedCards.push(clickTarget);
}

function findMatches() {
    if ( // Are the 2 cards a match?
        flippedCards[0].firstElementChild.className ===
        flippedCards[1].firstElementChild.className
    ) { // If so, they stay turned over and get pushed to matchedCards array
        flippedCards.forEach(function(card) {
            card.classList.toggle('match');
            matchedCards.push(card);
            flippedCards = [];
        })
    } else { // If not a match, flip them back over and reset the array
        setTimeout(() => {
            flipCard(flippedCards[0]);
            flipCard(flippedCards[1]);
            flippedCards = [];
        }, 700);
    }
}

function clickConditionals(clickTarget) {
    return (
        // Is it a card?
        clickTarget.classList.contains('card') &&
        // Does it already have the 'match' class?
        !clickTarget.classList.contains('match') &&
        // Are there less than 2 cards already clicked?
        flippedCards.length < 2 &&
        // Prevents same card from being clicked more than once
        !flippedCards.includes(clickTarget)
    );
}

// Start the timer and keep incrementing it every second.
function startTimer() {
    timer = setInterval(displayTimer, 1000);
}

// Show the timer while the user plays 
function displayTimer() {
    seconds++;
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    if (seconds >= 60) {
        minutes++;
        seconds = "00";
    }
    document.querySelector('.clock').innerHTML = "0" + minutes + ":" + seconds;
}

// Stop incrementing the timer
function stopTimer() {
    clearInterval(timer);
    seconds = -1;
    minutes = 0;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Loop through all the cards and shuffle them
function shuffleDeck() {
    const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
    const shuffledCards = shuffle(cardsToShuffle);
    for (card of shuffledCards) {
        deck.appendChild(card);
    }
}
shuffleDeck();

// Increment the moves each time the user clicks 2 cards 
function moveCounter() {
    moves++;
    let text = '1 Move'
    if (moves > 1 || moves === 0) {
        text = moves + ' Moves'
    }
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = text;
}

// Once the user gets to 6 moves, hide 1 star, and again when user gets to 12 moves
function checkScore() {
    if (moves === 6 || moves === 12) {
        hideStar();
    }
}

function hideStar() {
    const starList = document.querySelectorAll('.stars li');
    for (star of starList) {
        if (star.style.display !== 'none') {
            star.style.display = 'none';
            break;
        }
    }
}

// Once all 16 cards have been matched, open the modal, write the stats, and stop the timer
function gameOver() {
    toggleModal();
    writeModalStats();
    stopTimer();
}

// Show the modal dialog box
function toggleModal() {
    const modal = document.querySelector('.modal_background');
    modal.classList.toggle('hide');
}

// When the user clicks on the cancel X button, close the modal
document.querySelector('.modal_cancel').addEventListener('click', () => {
    toggleModal();
});

// Get the following pieces of info and display them inside the modal
function writeModalStats() {
    const timeStat = document.querySelector('.modal_time');
    const clockTime = document.querySelector('.clock').innerHTML;
    const movesStat = document.querySelector('.modal_moves');
    const starsStat = document.querySelector('.modal_stars');
    const stars = getStars();

    timeStat.innerHTML = `Time = ${clockTime}`;
    movesStat.innerHTML = `Moves = ${moves}`;
    starsStat.innerHTML = `Stars = ${stars}`;
}

// Count the stars that are displayed
function getStars() {
    stars = document.querySelectorAll('.stars li');
    starCount = 0;
    for (star of stars) {
        if (star.style.display !== 'none') {
            starCount++;
        }
    }
    return starCount;
}

// When the user resets the game by clicking on the arrow
function resetGame() {
    // stop the timer and start it over
    resetClockAndTime();
    // reset moves back to 0
    resetMoves();
    // reset the stars and display all 3
    resetStars();
    // shuffle the cards to begin a new game
    shuffleDeck();
    // flip all the cards back to starting position
    for (card of document.querySelectorAll('.card')) {
        card.classList.remove('open');
        card.classList.remove('show');
        card.classList.remove('match');
    }
    // reset the matched and flipped cards arrays 
    matchedCards = [];
    flippedCards = [];
}

// If user clicks replay after modal box displays, reset the game and close the modal
function replayGame() {
    resetGame();
    toggleModal();
}

function resetClockAndTime() {
    stopTimer();
    displayTimer();
    clockOff = true;
    seconds = 0;
    minutes = 0;
}

function resetMoves() {
    moves = 0;
    document.querySelector('.moves').innerHTML = moves + ' Moves';
}

function resetStars() {
    stars = 0;
    const starList = document.querySelectorAll('.stars li');
    for (star of starList) {
        star.style.display = 'inline';
    }
}

// If user clicks replay button on modal 
document.querySelector('.modal_replay').addEventListener('click', replayGame);

// If user clicks the restart arrow button
document.querySelector('.restart').addEventListener('click', resetGame);

// If user clicks the X cancel button on modal, close the modal
document.querySelector('.modal_close').addEventListener('click', toggleModal);


/*
SPECIAL THANKS to helpful reference from Matthew Cranford's Memory Game Walkthrough blogposts
https://matthewcranford.com/memory-game-walkthrough-part-1-setup/

Also thanks to @Erica Bee for pointing me in the right directions when I got stuck, as well as @Crystal and @Juan L.


/* A different solution to keep in mind, referenced from Mike Wale's Udacity webinar
https://www.youtube.com/watch?v=_rUH-sEs68Y

// Create a list that holds all of your cards
const cards = [ 'fa-diamond', 'fa-diamond',
                'fa-paper-plane-o', 'fa-paper-plane-o',
                'fa-anchor', 'fa-anchor',
                'fa-bolt', 'fa-bolt',
                'fa-cube', 'fa-cube',
                'fa-leaf', 'fa-leaf',
                'fa-bicycle', 'fa-bicycle',
                'fa-bomb', 'fa-bomb',
                ];

// Function creates cards programmatically and displays cards on the page
function generateCard(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

//  Add each card's HTML to the page
function initGame() {
    const cardHTML = shuffle(cards).map(function(card) {
        return generateCard(card);
    });
    moves = 0;
    moveCounter.innerText = moves;
    deck.innerHTML = cardHTML.join('');
} */