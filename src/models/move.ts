import { DraggableLocation } from '@hello-pangea/dnd';
import { CardType, GameState, PileArea } from '../type';
import { diffColor, getCardDetail } from '../util';

export default class Move {
  source: DraggableLocation;
  destination: DraggableLocation;
  cardId: string;

  constructor(
    source: DraggableLocation,
    destination: DraggableLocation,
    cardId: string
  ) {
    this.source = source;
    this.destination = destination;
    this.cardId = cardId;
  }

  // TODO: trying to move an unrevealed card should be invalid
  isValid(state: GameState): boolean {
    if (this.source == null || this.destination == null) return false;
    if (!this.cardId) return false;

    const [sourceSuit, sourceValue] = getCardDetail(this.cardId);
    const dest = this.destination.droppableId;
    const pile = state[dest] as CardType[];

    if (dest.startsWith(PileArea.FOUNDATION)) {
      /**
       * We either put
       * 1) A on an empty pile, or
       * 2) the next card of the same suit (e.g. <>7 on top of <>6)
       */
      if (pile.length < 1) {
        return sourceValue === 1; // A
      } else {
        const [destSuit, destValue] = getCardDetail(pile[0].id);
        return sourceSuit === destSuit && sourceValue === destValue + 1;
      }
    } else if (dest.startsWith(PileArea.TABLEAU)) {
      /**
       * source must be the value-1 card in a different color
       */
      if (pile.length < 1) {
        return sourceValue === 13; // K
      } else {
        const [destSuit, destValue] = getCardDetail(pile[pile.length - 1].id);
        return diffColor(sourceSuit, destSuit) && sourceValue + 1 === destValue;
      }
    } else {
      throw new Error(`Invalid move to destination ${dest}`);
    }
  }
}
