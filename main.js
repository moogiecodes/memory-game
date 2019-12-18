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
    card.classList.remove("visible", "disableClick", "match");
  });
  // shuffle backface card images after 1 sec
  setTimeout(() => {
    let shuffledArr = shuffle();
    for (let i = 0; i < shuffledArr.length; i++) {
      document.getElementsByClassName("backface-img")[i].src =
        "cardpics/card" + shuffledArr[i] + ".jpeg";
    }
  }, 1000);
  // reset states and count
  flippedState = false;
  matchInProg = false;
  selectedCards = 0;
  gameStart();
  flipCardDisplay();
}
// helper function to shuffle card images
function shuffle(srcArr) {
  srcArr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];
  for (var i = srcArr.length - 1; i > 0; i--) {
    // i = index of end of array
    var j = Math.floor(Math.random() * (i + 1)); // random index
    var tempVal = srcArr[i]; // temporarily hold val of end of array
    srcArr[i] = srcArr[j]; // end of array reassigned to random val
    srcArr[j] = tempVal; // random val reassigned to end of array
  }
  return srcArr;
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
