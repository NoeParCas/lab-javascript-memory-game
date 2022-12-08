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

    for(let i = 0; i < this.cards.length; i++){
      let j = Math.floor(Math.random() * i)
      let temp = this.cards[i]
      this.cards[i] = this.cards[j]
      this.pickedCards.push(temp)
    }
    console.log(this.pickedCards)
    return this.pickedCards
  }

  checkIfPair(card1, card2) {
    this.pairsClicked += 1;
    if(card1 === card2) {
      this.pairsGuessed += 1;
      return true;
    } else {
      return false;
    }
  }

  checkIfFinished() {
    const gamePairs = this.cards.length/2;
  
    if(gamePairs === this.pairsGuessed) {
      return true;
    } else {
      return false;
    }
  }
}
