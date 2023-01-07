const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' }
];

const memoryGame = new MemoryGame(cards);
let hasFlippedCard = false;
let firstCard, secondCard;
let blockedBoard = false;
let flipAudio = new Audio();
flipAudio.src = "../sound/flipcard-91468.mp3"
flipAudio.volume = 0.5;
let isPairAudio = new Audio();
isPairAudio.src = "../sound/decidemp3-14575.mp3"
isPairAudio.volume = 0.5;

window.addEventListener('load', (event) => {
  let html = '';

  memoryGame.shuffleCards().forEach((pic) => {
    html += `
      <div class="card" class="turned" data-framework="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  document.querySelector('#memory-board').innerHTML = html;
  let pairsClickedScore = document.querySelector('#pairs-clicked')
  let pairsGuessedScore = document.querySelector('#pairs-guessed')

  function reset() {
    hasFlippedCard = false;
    blockedBoard = false;
    [firstCard, secondCard] = [null, null];
  }

  function unflipCards() {
    blockedBoard = true;

    setTimeout(() => {
      firstCard.classList.remove('turned');
      secondCard.classList.remove('turned');

      reset();
    }, 1000);
  }

  function flipCard(card) {
    if(blockedBoard) {
      return 
    }

    flipAudio.play().then(() => {return true});

    card.classList.add('turned')

    if(!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = card;
      return;
    }

    secondCard = card;

    hasFlippedCard = false;

    let isPaired = memoryGame.checkIfPair(firstCard, secondCard);
   
    pairsClickedScore.innerText = memoryGame.pairsClicked;

    if (isPaired) {
      pairsGuessedScore.innerText = memoryGame.pairsGuessed;
      isPairAudio.play().then(() => {return true})
      firstCard.removeEventListener("click", flipCard);
      secondCard.removeEventListener("click", flipCard);
      memoryGame.checkIfFinished() && reset();
    } else {
      unflipCards()
    }
  }

  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => {
      flipCard(card);

      console.log(`Card clicked: ${card}`);
    });
  });
});
