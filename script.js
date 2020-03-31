
//////pre-game//////

var lockBoard = true;

///////start game//////unlock board////

var start=document.querySelector('#startButton');

var gameStart=function(){
    lockBoard = false;
};

start.addEventListener ('click',gameStart)

/////set game timer

var second = 0, minute = 0;

var timer = document.querySelector("#startButton");

var interval;

var timerHasBeenClicked = false

function startTimer(){
////////only click once//////

if(timerHasBeenClicked === false) {
    timerHasBeenClicked = true ;

    interval = setInterval(function(){
        timer.innerText = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
};

}

timer.addEventListener('click',startTimer)

//////////game play///////

var cards = document.querySelectorAll('.memory-card');

var firstCard, secondCard;

var hasFlippedCard = false;

// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
   cards[i].addEventListener("click", flipCard);
};


function flipCard() {

  if (lockBoard === true) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  };

    secondCard = this;
    checkForMatch();
}

var matchCounter = 0

var count = 0;

var flipCount =document.querySelector('#count');


////////check matching cards////

var checkForMatch=function(){

   count = count+1;


   flipCount.innerText = count;

   var match = firstCard.dataset.framework === secondCard.dataset.framework;


    if( match ){
        disableCards();
        matchCounter = matchCounter + 1;
        if (matchCounter === 10) {
            gameHasWon()
        };
        }else{
            unflipCards()
        };
};

//////match

var disableCards=function() {

      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);

      resetCard();

};

//////no match

var unflipCards=function() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetCard();
    }, 1000);
};

/////back to norm

function resetCard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
};

///////shuffle random,

function shuffle() {
  for (var i = 0; i < cards.length; i++)
  {
    var randomPos = Math.floor(Math.random() * 20);
    cards[i].style.order = randomPos;

   };
};

shuffle();

////////This is a comment to commit//


////////flex-wrap///
///////math.floor-whole number
//////math.random (0-1) decimal



////////////Game ends

////////All 20 cards have been flipped


var gameOver = document.querySelector('#game over')

var gameHasWon = function() {

    var finalTime = timer.innerText;
    var finalCount = flipCount.innerText;

    var congratulation = document.querySelector('#congratulations')


    congratulation.innerText = "You took  " + finalTime + "  and  "+ finalCount + " moves  ! " ;

    var unhide = document.querySelector('.hide')

    unhide.classList.remove("hide");

};