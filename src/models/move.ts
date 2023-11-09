import { GameState, PileArea } from '../type';
import { diffColor, getCardDetail, getPileDetail } from '../util';

export default class Move {
  sourceId: string;
  destId: string;
  cardIds: string[];

  constructor(sourceId: string, destId: string, cardIds: string[]) {
    this.sourceId = sourceId;
    this.destId = destId;
    this.cardIds = cardIds;
  }

  isValid(state: GameState): boolean {
    if (this.sourceId == null || this.destId == null) return false;
    if (this.cardIds.length < 1) return false;

    const [sourceSuit, sourceValue] = getCardDetail(this.cardIds[0]);
    const [dest, pile] = getPileDetail(this.destId, state);

    if (dest === PileArea.FOUNDATION) {
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
    } else if (dest === PileArea.TABLEAU) {
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
