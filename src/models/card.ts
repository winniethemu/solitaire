import { Suit } from '../type';

export default class Card {
  value: number;
  suit: Suit;
  revealed: boolean;

  constructor(value: number, suit: Suit, revealed: boolean) {
    this.value = value;
    this.suit = suit;
    this.revealed = revealed;
  }

  get valueSymbol() {
    const symbols: Record<number, string> = {
      1: 'A',
      11: 'J',
      12: 'Q',
      13: 'K',
    };
    if (this.value in symbols) return symbols[this.value];
    return this.value;
  }

  get suitSymbol() {
    switch (this.suit) {
      case Suit.SPADE:
        return '♠';
      case Suit.HEART:
        return '♥';
      case Suit.CLUB:
        return '♣';
      case Suit.DIAMOND:
        return '♦';
      default:
        throw new Error(`Unknown suit value: ${this.suit}`);
    }
  }
}
