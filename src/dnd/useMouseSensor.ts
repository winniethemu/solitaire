import React from 'react';
import { PreDragActions, SensorAPI } from '@hello-pangea/dnd';

enum DragPhase {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  DRAGGING = 'DRAGGING',
  COMPLETE = 'COMPLETE',
}

export default function useMouseSensor(api: SensorAPI) {
  const phaseRef = React.useRef(DragPhase.IDLE);

  const startPendingDrag = React.useCallback(
    (event: MouseEvent, actions: PreDragActions) => {
      phaseRef.current = DragPhase.PENDING;
      const drag = actions.fluidLift({ x: event.clientX, y: event.clientY });

      window.addEventListener(
        'mousemove',
        function onMouseMove(moveEvent: MouseEvent) {
          drag.move({ x: moveEvent.clientX, y: moveEvent.clientY });
        }
      );

      window.addEventListener(
        'mousedown',
        function onMouseMove(downEvent: MouseEvent) {
          // cancel
        }
      );

      window.addEventListener(
        'mouseup',
        function onMouseMove(upEvent: MouseEvent) {
          drag.drop();
        }
      );
    },
    []
  );

  const onInitialMouseDown = React.useCallback(
    (event: MouseEvent) => {
      if (phaseRef.current !== DragPhase.IDLE) {
        // cancel
      }

      const draggableId = api.findClosestDraggableId(event);
      if (!draggableId) return;
      const preDrag = api.tryGetLock(draggableId);
      if (!preDrag) return;

      window.removeEventListener('mousedown', onInitialMouseDown);
      startPendingDrag(event, preDrag);
    },
    [api, startPendingDrag]
  );

  React.useLayoutEffect(() => {
    window.addEventListener('mousedown', onInitialMouseDown);
    return () => {
      window.removeEventListener('mousedown', onInitialMouseDown);
    };
  }, [onInitialMouseDown]);
}
