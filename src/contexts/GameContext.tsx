import React from 'react';
import { GameAction, GameContextType, GameState, PileArea } from '../type';
import { initGame } from '../util';

const GameContext = React.createContext<GameContextType>(null);
GameContext.displayName = 'GameContext';

function reducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'move': {
      const { source, destination } = action.payload;
      const [srcName, srcIndex] = source.droppableId.split(':');
      const [destName, destIndex] = destination.droppableId.split(':');
      const nextState = { ...state };
      const srcPile = nextState[srcName as PileArea][Number(srcIndex)];
      const destPile = nextState[destName as PileArea][Number(destIndex)];
      const moving = srcPile.slice(source.index);
      nextState[srcName][Number(srcIndex)] = srcPile.slice(0, source.index);
      destPile.splice(destination.index, 0, ...moving);
      return nextState;
    }
    case 'reset': {
      // FIXME
      return state;
    }
  }
}

const initialState = initGame();

export function GameProvider({ ...props }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = [state, dispatch] as GameContextType;
  return <GameContext.Provider value={value} {...props} />;
}

export function useGameState() {
  const context = React.useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
