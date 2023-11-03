import React from 'react';
import { GameAction, GameState } from '../type';
import { initGame } from '../util';

const GameContext = React.createContext(null);
GameContext.displayName = 'GameContext';

function reducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'move': {
      return state;
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
  const value = [state, dispatch];
  return <GameContext.Provider value={value} {...props} />;
}

export function useGameState() {
  const context = React.useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
