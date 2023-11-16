import React from 'react';
import { SensorAPI } from '@hello-pangea/dnd';

import { useGameState } from '../contexts/GameContext';

export default function useMouseSensor(api: SensorAPI) {
  const [state] = useGameState();

  function start() {
    const preDrag = api.tryGetLock(state.tableau1[0].id);
    if (!preDrag) return;

    const drag = preDrag.snapLift();
    drag.moveDown();
    drag.drop();
  }

  React.useEffect(() => {
    window.addEventListener('click', start);
    return () => window.removeEventListener('click', start);
  }, []);
}
