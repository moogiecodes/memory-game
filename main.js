let selectedCards = 0; // TOTAL turned cards counter (upon click)
let cardDivs = document.getElementsByClassName("card-div");
let cardDivsArray = [...cardDivs];
let card1, card2;
let flippedState = false;
let matchInProg = false;

function gameStart() {
  // event listeners for all cards
  cardDivsArray.forEach(card => {
    card.addEventListener("click", flipCard);
    card.addEventListener("click", flipCardDisplay);
  });
}
function flipCardDisplay() {
  document.getElementById("flippedCounter").innerText =
    "Total Flipped Cards:" + selectedCards;
}
// when a card is clicked
function flipCard() {
  if (matchInProg === true) return; // do nothing if there is a match in progress
  this.classList.add("disableClick"); // disables clicking on same card
  if (matchInProg === false) {
    // if not currently checking for a match
    this.classList.add("visible"); // reveals card
    selectedCards++; // increment total selected cards counter
  }
  // store card 1 and card 2 vars
  if (flippedState === false) {
    card1 = this;
    flippedState = true;
    return;
  } else {
    flippedState = false;
    card2 = this;
  }
  // initiate match testing
  checkCardPair();
}
function checkCardPair() {
  // check if cards hold value
  if (card1 !== null && card2 !== null) {
    // if both cards are a MATCH
    if (
      card1.getElementsByClassName("backface-img")[0].src ===
      card2.getElementsByClassName("backface-img")[0].src
    ) {
      // remove event listeners on just those 2 cards
      card1.removeEventListener("click", flipCard);
      card1.removeEventListener("click", flipCardDisplay);
      card2.removeEventListener("click", flipCard);
      card2.removeEventListener("click", flipCardDisplay);
      // add "matched" class
      card1.classList.add("match");
      card2.classList.add("match");
    }
    // if card DOESN'T match
    else {
      matchInProg = true;
      //after 1 sec, flips back, re-enable click
      setTimeout(() => {
        card1.classList.remove("visible", "disableClick");
        card2.classList.remove("visible", "disableClick");
        // change checking state back to false, so card can be visible again
        matchInProg = false;
      }, 1000);
    }
  }
}

/* 
Notes: 
- selectedCards is even #, initiate function to compare match ?
- disable click on rest of the cards when comparing 2 cards ? or until both cards flipped back

- make an array to hold matched cards?
- if array reaches length of matched array or count, victory? document.getElementsByClassName("match").length
- function that sets random pics under cards on START GAME button click?
*/

window.onload = gameStart();
