let selectedCards = 0; // TOTAL turned cards counter (upon click)
let cardDivs = document.getElementsByClassName("card-div");
let cardDivsArray = [...cardDivs];
let cardImgs = document.getElementsByClassName("backface-img");
let cardImgsArray = [...cardImgs];
let card1, card2;
let flippedState = false;
let matchInProg = false;

function gameStart() {
  // event listeners for all cards
  cardDivsArray.forEach(card => {
    card.addEventListener("click", flipCard);
  });
  document.getElementById("restartbtn").addEventListener("click", restartGame);
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
    flipCardDisplay(); // display game counter
  }
  // store card 1 and card 2 variables
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
      // check if all cards have been matched, initiate victory alert after 1.5 sec
      setTimeout(() => {
        victory();
      }, 1500);
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
// on restart game button click
function restartGame() {
  // clear all classes on cards
  cardDivsArray.forEach(card => {
    card.classList.remove("visible", "disableClick");
  });
  // shuffle backface card images
  let shuffledCardImgs = shuffle(cardImgsArray);
  for (let i = 0; i < cardImgsArray.length; i++) {
    document.getElementsByTagName("img")[i].src = shuffledCardImgs[i].src;
  }
  // reset states and count
  flippedState = false;
  matchInProg = false;
  selectedCards = 0;
  gameStart();
  flipCardDisplay();
}
function shuffle(cardImgsArray) {
  // swaps end of array with random array val
  let randomIdx,
    tempVal,
    arrayLengthIdx = cardImgsArray.length;
  while (arrayLengthIdx !== 0) {
    randomIdx = Math.floor(Math.random() * arrayLengthIdx);
    arrayLengthIdx--;
    tempVal = cardImgsArray[arrayLengthIdx];
    cardImgsArray[arrayLengthIdx] = cardImgsArray[randomIdx];
    cardImgsArray[randomIdx] = tempVal;
  }
  return cardImgsArray;
}
// victory alert
function victory() {
  if (
    document.getElementsByClassName("match").length === cardDivsArray.length
  ) {
    window.alert(
      "Victory! Your score for this game is: " +
        selectedCards +
        " total flipped cards."
    );
  }
}
// initiate on window load
window.onload = gameStart();
