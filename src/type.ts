import { Dispatch } from 'react';
import Card from './models/card';
import Move from './models/move';

export type CardType = Card;
export type MoveType = Move;

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
export type GameAction = MoveAction | ResetAction;

export interface MoveAction {
  type: 'move';
  payload: Move;
}

export interface ResetAction {
  type: 'reset';
}

export type GameContextType = [GameState, Dispatch<GameAction>] | null;
