import React from 'react';
import { CardType, GameAction, GameContextType, GameState } from '../type';
import { initGame } from '../util';

const GameContext = React.createContext<GameContextType>(null);
GameContext.displayName = 'GameContext';

function reducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'move': {
      const { source, destination } = action.payload;
      const nextState = { ...state };
      const srcPile = nextState[source.droppableId] as CardType[];
      const destPile = nextState[destination.droppableId].slice() as CardType[];
      const moving = srcPile.slice(source.index);
      nextState[source.droppableId] = srcPile.slice(0, source.index);
      destPile.splice(destination.index, 0, ...moving);
      nextState[destination.droppableId] = destPile;
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
