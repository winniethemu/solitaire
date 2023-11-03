import Card from './models/card';
import Move from './models/move';

export enum Pile {
  STOCK = 0,
  WASTE = 1,
  TABLEAU = 2,
  FOUNDATION = 3,
}

export enum Suit {
  SPADE = 0,
  HEART = 1,
  CLUB = 2,
  DIAMOND = 3,
}

export interface GameState {
  foundation: Array<Card[]>;
  history: Array<Move>;
  stock: Array<Card>;
  tableau: Array<Card[]>;
  waste: Array<Card>;
}

export type GameActionType = 'move' | 'reset';

export interface GameAction {
  type: GameActionType;
  payload: unknown;
}
