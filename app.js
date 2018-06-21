const deck = document.querySelector('.deck');

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

// Display the cards on the page
function generateCard(card) {
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

//  Add each card's HTML to the page
function initGame() {
    const deck = document.querySelector('.deck');
    const cardHTML = shuffle(cards).map(function(card) {
        return generateCard(card);
    });
    moves = 0;
    moveCounter.innerText = moves;
    deck.innerHTML = cardHTML.join('');
}
// Increment the move counter and display it on the page
let moves = 0;
const moveCounter = document.querySelector('.moves');

// Check the score to hide stars
function checkScore () {
    if (moves === 6 || moves === 12) {
        hideStar();
    }
}

// Hide a star 
function hideStar() {
    const starList = document.querySelectorAll('.stars li');
    for (star of starList){
        if (star.style.display !== 'none') {
            star.style.display = 'none';
            break;
        }
    }
}

hideStar();
hideStar();

initGame();

const allCards = document.querySelectorAll('.card');
// Put open cards in an array. Show 2 cards, hide others that are clicked after. 
var openCards = [];

// Set up the event listener for a card. If a card is clicked, display the card's symbol 
allCards.forEach(function(card) {
    card.addEventListener('click', function(e) {
        // Prevent clicking twice on the same card; also prevents clicking more than 2 cards
        if (openCards.length < 2 && !card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
            openCards.push(card);
                card.classList.add('open', 'show');
            }
            // If cards do NOT match, they'll flip back over.
            if (openCards.length === 2) {
                if(openCards[0].dataset.card == openCards[1].dataset.card) {
                    openCards[0].classList.add('match');
                    openCards[0].classList.add('open');
                    openCards[0].classList.add('show');

                    openCards[1].classList.add('match');
                    openCards[1].classList.add('open');
                    openCards[1].classList.add('show');

                    openCards = [];
                } else {
                    // Add function to flip the cards back over after some time.
                    setTimeout(function() {
                        openCards.forEach(function(card) {
                            card.classList.remove('open', 'show');
                        });
                
                    openCards = [];
                }, 1000);
            }

            moves += 1;
            moveCounter.innerText = moves;
            checkScore();
        }
    });
});

//if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)