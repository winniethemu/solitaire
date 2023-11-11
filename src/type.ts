import { Dispatch } from 'react';
import Card from './models/card';
import Move from './models/move';

export type CardType = Card;
export type MoveType = Move;

export enum PileArea {
  STOCK = 'stock',
  WASTE = 'waste',
  TABLEAU = 'tableau',
  FOUNDATION = 'foundation',
}

export enum Suit {
  SPADE = 0,
  HEART = 1,
  CLUB = 2,
  DIAMOND = 3,
}

export interface GameState {
  foundation1: Card[];
  foundation2: Card[];
  foundation3: Card[];
  foundation4: Card[];

  tableau1: Card[];
  tableau2: Card[];
  tableau3: Card[];
  tableau4: Card[];
  tableau5: Card[];
  tableau6: Card[];
  tableau7: Card[];

  history: Move[];
  stock: Card[];
  waste: Card[];

  [key: string]: Card[] | Move[];
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
