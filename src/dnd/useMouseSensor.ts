import React from 'react';
import { FluidDragActions, PreDragActions, SensorAPI } from '@hello-pangea/dnd';
import { bindEvent, sloppyClick } from '../util';

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
  const unbindDownRef = React.useRef(() => {});
  const unbindMoveRef = React.useRef(() => {});
  const unbindUpRef = React.useRef(() => {});

  // eslint-disable-next-line
  let onIdle: () => void;

  function unbindAll() {
    unbindDownRef.current();
    unbindUpRef.current();
    unbindMoveRef.current();
  }

  const reset = React.useCallback(
    function reset() {
      unbindAll();
      phaseRef.current = { name: 'IDLE' };
      onIdle();
    },
    [onIdle]
  );

  const cancel = React.useCallback(
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
      reset();
    },
    [reset]
  );

  /**
   * Pre-condition:
   * 1. mousedown detected
   * 2. draggable element found
   * 3. lock acquired
   */
  const onPending = React.useCallback(
    function onPending(downEvent: MouseEvent, actions: PreDragActions) {
      phaseRef.current = {
        name: 'PENDING',
        actions,
      };
      unbindMoveRef.current = bindEvent(window, 'mousemove', handleMouseMove);
      unbindUpRef.current = bindEvent(window, 'mouseup', handleMouseUp);

      function handleMouseMove(moveEvent: MouseEvent) {
        moveEvent.preventDefault();
        const { name, actions } = phaseRef.current;
        if (name === 'DRAGGING') {
          actions.move({ x: moveEvent.clientX, y: moveEvent.clientY });
          return;
        }

        if (sloppyClick(downEvent, moveEvent)) return;

        const drag = actions.fluidLift({
          x: downEvent.clientX,
          y: downEvent.clientY,
        });

        phaseRef.current = {
          name: 'DRAGGING',
          actions: drag,
        };
      }

      function handleMouseUp(upEvent: MouseEvent) {
        const { name, actions } = phaseRef.current;
        if (name === 'DRAGGING') {
          upEvent.preventDefault();
          actions.drop();
          reset();
        } else {
          cancel();
        }
      }
    },
    [cancel, reset]
  );

  onIdle = React.useCallback(
    function onIdle() {
      function handleMouseDown(event: MouseEvent) {
        const phase = phaseRef.current;
        if (phase.name !== 'IDLE') {
          cancel();
          return;
        }

        const draggableId = api.findClosestDraggableId(event);
        if (!draggableId) return;
        const preDrag = api.tryGetLock(draggableId);
        if (!preDrag) return;

        onPending(event, preDrag);
      }

      unbindDownRef.current = bindEvent(window, 'mousedown', handleMouseDown);
    },
    [api, cancel, onPending]
  );

  React.useLayoutEffect(() => {
    onIdle();
    return () => unbindAll();
  }, [onIdle]);
}
