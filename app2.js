const cards = document.querySelectorAll('.card');

const deck = document.querySelector('.deck');
let flippedCards = [];
let moves = 0;
let clockOff = true;
let seconds = 0;
let minutes = 0;
let timer;

function startTimer() {
    timer = setInterval(displayTimer, 1000);
}

function stopTimer() {
    clearInterval(timer);
    seconds = 0;
    minutes = 0;
}

function displayTimer() {
    seconds++;
    if (seconds < 10) {
        seconds = `0${seconds}`;
    } if (seconds >= 60) {
        minutes++;
        seconds = "00";
    }
        document.querySelector('.clock').innerHTML = "0" + minutes + ":" + seconds;
}

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
            checkForMatch(clickTarget);
            moveCounter();
            checkScore();
        }
    }
});

function flipCard(card) {
    card.classList.toggle('open');
    card.classList.toggle('show');
}

function addFlippedCard(clickTarget) {
    flippedCards.push(clickTarget);
    console.log(flippedCards);
}
// call this on click event listener
function checkForMatch() {
    if (
        flippedCards[0].firstElementChild.className === 
        flippedCards[1].firstElementChild.className
    ) {
        console.log('match');
        flippedCards[0].classList.toggle('match');
        flippedCards[1].classList.toggle('match');
        flippedCards = [];
    } else {
        console.log('not a match');
        setTimeout(() => {
            // hides the icons if not a match
            flipCard(flippedCards[0]);
            flipCard(flippedCards[1]);
            flippedCards = [];
        }, 1000);
    }
}

function clickConditionals(clickTarget) {
    return (
        clickTarget.classList.contains('card') &&
        !clickTarget.classList.contains('match') &&
        flippedCards.length < 2 &&
        !flippedCards.includes(clickTarget)
    );
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

function shuffleDeck() {
    const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
    const shuffledCards = shuffle(cardsToShuffle);
    for (card of shuffledCards) {
        deck.appendChild(card);
    }
}
shuffleDeck();

function moveCounter() {
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
}

function checkScore() {
    if (moves === 6 || moves === 12
) {     hideStar();
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



/*
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
}

// Set up the event listener for a card. If a card is clicked, display the card's symbol 

            checkScore();
        }
    });
});
}


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
