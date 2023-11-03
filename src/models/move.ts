import { Pile } from '../type';
import Card from './card';

export default class Move {
  card: Card;
  source: Pile;
  dest: Pile;

  constructor(card: Card, source: Pile, dest: Pile) {
    this.card = card;
    this.source = source;
    this.dest = dest;
  }
}
