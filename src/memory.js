class MemoryGame {
  constructor(cards) {
    this.cards = cards;
    this.pickedCards = [];
    this.pairsClicked = 0;
    this.pairsGuessed = 0;
  }

  shuffleCards() {
    if(!this.cards) {
      return undefined;
    }

    const nonRepeatedCards = [
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
    ]

    const clonedArray = [...nonRepeatedCards]

    for(let i = 0; i < clonedArray.length; i++) {
      const random = Math.floor(Math.random() * (i + 1));
      clonedArray[i] = clonedArray[random];

      if(!this.pickedCards.includes(clonedArray[i])) {
        this.pickedCards.push(clonedArray[i]);
      }
    }

    nonRepeatedCards.forEach(card1 => {
      if(!this.pickedCards.includes(card1)) {
        this.pickedCards.push(card1);
      }
    })

    const clonedPickedCards = [...this.pickedCards];
    const slicedPickedCards = clonedPickedCards.slice(4,12)
    clonedPickedCards.splice(4,8)
    clonedPickedCards.unshift(...slicedPickedCards);
 
    this.pickedCards.push(...clonedPickedCards);
    
    return this.pickedCards;
  }
  
  checkIfPair(card1, card2) {
    this.pairsClicked += 1;
    
    if(card1.dataset.framework === card2.dataset.framework) {
      this.pairsGuessed += 1;
      return true;
    }else {
      return false;
    }
  }

  checkIfFinished() {
    const gamePairs = this.cards.length/2;
  
    if(gamePairs === this.pairsGuessed) {
      console.log("fuck, Iam done")
      return true;
    } else {
      return false;
    }
  }
}
