import React from 'react';
import { FluidDragActions, PreDragActions, SensorAPI } from '@hello-pangea/dnd';
import { bindEvent } from '../util';

interface Idle {
  name: 'IDLE';
}

interface Pending {
  name: 'PENDING';
  actions: PreDragActions;
}

interface Dragging {
  name: 'DRAGGING';
  actions: FluidDragActions;
}

type DragPhase = Idle | Pending | Dragging;

export default function useMouseSensor(api: SensorAPI) {
  const phaseRef = React.useRef<DragPhase>({ name: 'IDLE' });
  const unbindRef = React.useRef<() => void>(() => {});

  // eslint-disable-next-line
  let cancel: () => void, onIdle: () => void;

  cancel = React.useCallback(
    function cancel() {
      const phase = phaseRef.current;
      if (phase.name === 'IDLE') {
        return;
      } else if (phase.name === 'PENDING') {
        phase.actions.abort();
      } else {
        // DRAGGING
        phase.actions.cancel();
      }
      phaseRef.current = { name: 'IDLE' };
      unbindRef.current();
      onIdle();
    },
    [onIdle]
  );

  /**
   * Pre-condition:
   * 1. mousedown detected
   * 2. draggable element found
   * 3. lock acquired
   */
  const onPending = React.useCallback(
    function onPending(event: MouseEvent, actions: PreDragActions) {
      phaseRef.current = {
        name: 'PENDING',
        actions,
      };
      const drag = actions.fluidLift({ x: event.clientX, y: event.clientY });

      window.addEventListener(
        'mousemove',
        function handleMouseMove(event: MouseEvent) {
          unbindRef.current = bindEvent(window, 'mousemove', handleMouseMove);
          phaseRef.current = {
            name: 'DRAGGING',
            actions: drag,
          };
          drag.move({ x: event.clientX, y: event.clientY });
        }
      );

      window.addEventListener('mouseup', function handleMouseUp() {
        if (phaseRef.current.name === 'DRAGGING') {
          drag.drop();
        } else {
          cancel();
        }
        phaseRef.current.name = 'IDLE';
        unbindRef.current();
      });
    },
    [cancel]
  );

  onIdle = React.useCallback(
    function onIdle() {
      function handleMouseDown(event: MouseEvent) {
        const phase = phaseRef.current;
        if (phase.name !== 'IDLE') {
          cancel();
        }

        const draggableId = api.findClosestDraggableId(event);
        if (!draggableId) return;
        const preDrag = api.tryGetLock(draggableId);
        if (!preDrag) return;

        onPending(event, preDrag);
      }

      unbindRef.current = bindEvent(window, 'mousedown', handleMouseDown);
    },
    [api, cancel, onPending]
  );

  React.useLayoutEffect(() => {
    onIdle();
    return () => unbindRef.current();
  }, [onIdle]);
}
