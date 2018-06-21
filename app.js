/*
 * Create a list that holds all of your cards
 */
const cards = [ 'fa-diamond', 'fa-diamond',
                'fa-paper-plane-o', 'fa-paper-plane-o',
                'fa-anchor', 'fa-anchor',
                'fa-bolt', 'fa-bolt',
                'fa-cube', 'fa-cube',
                'fa-leaf', 'fa-leaf',
                'fa-bicycle', 'fa-bicycle',
                'fa-bomb', 'fa-bomb',
                ];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML */                
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

 /*  Add each card's HTML to the page
 */
function initGame() {
    const deck = document.querySelector('.deck');
    const cardHTML = shuffle(cards).map(function(card) {
        return generateCard(card);
    });
    moves = 0;
    moveCounter.innerText = moves;
    deck.innerHTML = cardHTML.join('');
}
// increment the move counter and display it on the page
var moves = 0;
var moveCounter = document.querySelector('.moves');

initGame();

const allCards = document.querySelectorAll('.card');
// put open cards in an array. Show 2 cards, hide others that are clicked after. COMMIT
var openCards = [];

/* Set up the event listener for a card. If a card is clicked, display the card's symbol (put this functionality in another function that you call from this one) COMMIT 
*/
allCards.forEach(function(card) {
    card.addEventListener('click', function(e) {
        // prevent clicking twice on the same card; also prevents clicking more than 2 cards
        if (openCards.length < 2 && !card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
            openCards.push(card);
                card.classList.add('open', 'show');
            }
            // if cards do NOT match, they'll flip back over.
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
                    // add function to flip the cards back over after some time.
                    setTimeout(function() {
                        openCards.forEach(function(card) {
                            card.classList.remove('open', 'show');
                        });
                
                    openCards = [];
                }, 1000);
            }

            moves += 1;
            moveCounter.innerText = moves;
        }
    });
});

/*
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
