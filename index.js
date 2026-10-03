
var images = [
    "assets/aka.png",
    "assets/bla.png",
    "assets/el.png",
    "assets/goatpool.png",
    "assets/ziz.png",
    "assets/hadess.png",
    "assets/jj.png",
    "assets/joestar.png",
];

var firstcard = null;
var secondcard = null;
var canflip = true;
var matches = 0;
var moves = 0;
var seconds = 0;
var timerrunning = false;
var timerinterval;



function startGame() {
    var gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = "";

    var cardImages = images.concat(images); // duplicate the images for pairs
    cardImages.sort(function () {
        return Math.random() - 0.5;
    });

    for (var i = 0; i < cardImages.length; i++) {
        var card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `<div class="card-front"><i class="fas fa-heart"></i></div>
    <div class="card-back"><img src="${cardImages[i]}" alt=""></div> `
        card.onclick = flipCard;
        card.dataset.image = cardImages[i]; // store the image path in a data attribute
        gameBoard.appendChild(card);
    }


    firstcard = null;
    secondcard = null;
    canflip = true;
    matches = 0;
    moves = 0;
    seconds = 0;
    timerrunning = false;

    updateStats();
    clearInterval(timerinterval);


}

function flipCard() {
    if (!canflip) return;
    if (this.classList.contains("flipped")) return;
    if (this.classList.contains("matched")) return;

    if (!timerrunning) {
        startTimer();

    }

    this.classList.add("flipped");

    if (firstcard == null) {
        firstcard = this;
    } else {
        secondcard = this;
        canflip = false;
        moves++;
        updateStats();
        checkMatch();
    }


}

function checkMatch() {

    var match = firstcard.dataset.image === secondcard.dataset.image;

    if (match) {
        setTimeout(() => {  
            firstcard.classList.add("matched");
            secondcard.classList.add("matched");
            matches++;
            updateStats();
            resetCards();

            if (matches === 8) {
                endGame();
            }
        }, 500);

    }
    else {
        setTimeout(() => {
            firstcard.classList.remove("flipped");
            secondcard.classList.remove("flipped");
            resetCards();
        }, 1000);

    }
}

function resetCards() {
    firstcard = null;
    secondcard = null;
    canflip = true;
}

function startTimer() {
    timerrunning = true;
    timerinterval = setInterval(() => {
        seconds++;
        updateStats();
    }, 1000);


}

function updateStats() {
    document.getElementById("moves").textContent = moves;
    document.getElementById("matches").textContent = matches + "/8";

    var mins = Math.floor(seconds / 60);
    var secs = seconds % 60;

    if (secs < 10) {
        secs = "0" + secs; 
     }
        document.getElementById("time").textContent = mins + ":" + secs;
  


}



function endGame() {
    clearInterval(timerinterval);
    document.getElementById('finalMoves').textContent = moves;
    document.getElementById('finalTime').textContent = document.getElementById("time").textContent;
document.getElementById('winModel').classList.add('show');



}


function newGame() {
    document.getElementById('winModel').classList.remove('show');
    clearInterval(timerinterval);
    startGame();
}
startGame();