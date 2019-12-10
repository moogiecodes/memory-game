let selectedCards = 0; // TOTAL turned cards counter (upon click)
let cardDivs = document.getElementsByClassName("card-div");
let cardDivsArray = [...cardDivs];
let card1, card2;
let flippedState = false;

function gameStart() {
  // event listeners for all cards
  for (let i = 0; i < cardDivsArray.length; i++) {
    cardDivsArray[i].addEventListener("click", flipCard);
    cardDivsArray[i].addEventListener("click", flipCardDisplay);
  }
}
function flipCardDisplay() {
  document.getElementById("flippedCounter").innerText =
    "Total Flipped Cards:" + selectedCards;
}
// when a card is clicked
function flipCard() {
  this.classList.toggle("disableClick"); // disables clicking on same card
  this.classList.toggle("visible"); // reveals card
  selectedCards++; // increment total selected cards counter
  // store card 1 & card 2
  if (flippedState === false) {
    card1 = this;
    flippedState = true;
  } else {
    flippedState = false;
    card2 = this;
  }
  console.log("card1 is" + card1);
  console.log("card2 is" + card2);
  // if cards match
  if (card1 !== undefined && card2 !== undefined) {
    if (
      card1.getElementsByClassName("backface-img")[0].src ===
      card2.getElementsByClassName("backface-img")[0].src
    ) {
      console.log("it's a match!");
    }
  }
  // if card doesn't match
  if (
    card1.getElementsByClassName("backface-img")[0].src !==
    card2.getElementsByClassName("backface-img")[0].src
  ) {
    //after 2 secs, flips back, re-enable click
    setTimeout(() => {
      card1.classList.remove("visible", "disableClick");
      card2.classList.remove("visible", "disableClick");
    }, 2000);
  }
}
/* Notes: 
- selectedCards is even #, initiate function to compare match ?
- disable click on rest of the cards when comparing 2 cards ? or until both cards flipped back

- make an array to hold matched cards?
- if array reaches length of cards array, victory?
- function that sets random pics under cards on START GAME button click?
*/

window.onload = gameStart();
