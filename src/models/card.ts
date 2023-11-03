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
}
