import Card from './models/card';
import { GameState } from './type';

// A = 1, J = 11, Q = 12, K = 13
const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const SLOPPY_CLICK_THRESHOLD = 5;

function createDeck(): Card[] {
  const deck = [];
  for (let suit = 0; suit < 4; suit++) {
    for (const value of values) {
      const card = new Card(value, suit, false);
      deck.push(card);
    }
  }
  return deck;
}

// Knuth shuffle
function shuffle(deck: Card[]): Card[] {
  for (let i = deck.length - 1; i >= 0; i--) {
    // 0 <= j <= i
    const j = Math.floor(Math.random() * (i + 1));
    // swap
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export function initGame(): GameState {
  const stock = shuffle(createDeck());
  const tableau = [];
  for (let i = 0; i < 7; i++) tableau[i] = [] as Card[];

  for (let i = 0; i < 7; i++) {
    // 1. One card face up for first pile
    const card = stock.pop() as Card;
    card.revealed = true;
    tableau[i].push(card);

    // 2. One card face down for each of the rest of the piles
    for (let j = i + 1; j < 7; j++) {
      tableau[j].push(stock.pop() as Card);
    }
  }

  return {
    foundation1: [],
    foundation2: [],
    foundation3: [],
    foundation4: [],
    tableau1: tableau[0],
    tableau2: tableau[1],
    tableau3: tableau[2],
    tableau4: tableau[3],
    tableau5: tableau[4],
    tableau6: tableau[5],
    tableau7: tableau[6],
    history: [],
    stock,
    waste: [],
  };
}

export function getCardDetail(id: string): [number, number] {
  const [suit, value] = id.split(':');
  return [Number(suit), Number(value)];
}

export function diffColor(suit1: number, suit2: number): boolean {
  return suit1 % 2 !== suit2 % 2;
}

export function bindEvent(
  target: HTMLElement | Window,
  eventName: string,
  handler: (e: Event) => void
) {
  target.addEventListener(eventName, handler);
  return function unbind() {
    target.removeEventListener(eventName, handler);
  };
}

export function sloppyClick(sourceEvent: MouseEvent, targetEvent: MouseEvent) {
  const [x0, y0] = [sourceEvent.clientX, sourceEvent.clientY];
  const [x1, y1] = [targetEvent.clientX, targetEvent.clientY];
  return Math.abs(x0 - x1) < 5 && Math.abs(y0 - y1) < SLOPPY_CLICK_THRESHOLD;
}
