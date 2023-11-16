import { DragDropContext, DropResult } from '@hello-pangea/dnd';

import Tableau from './components/Tableau/Tableau';

import styles from './App.module.css';
import { useGameState } from './contexts/GameContext';
import Move from './models/move';
import useMouseSensor from './dnd/useMouseSensor';

function App() {
  const [state, dispatch] = useGameState();

  function handleDragEnd(result: DropResult) {
    console.log(result); // TODO: remove
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const move = new Move(source, destination, draggableId);

    if (move.isValid(state)) {
      dispatch({
        type: 'move',
        payload: move,
      });
    }
  }

  return (
    <div className={styles.container}>
      <nav className={styles.topnav}>
        <h1>Solitaire</h1>
        <button>Undo</button>
        <button>Reset</button>
      </nav>
      <main className={styles.content}>
        <DragDropContext
          onDragEnd={handleDragEnd}
          enableDefaultSensors={false}
          sensors={[useMouseSensor]}
        >
          <section className={styles.stock}></section>
          <section className={styles.tableau}>
            <Tableau />
          </section>
          <section className={styles.foundation}></section>
        </DragDropContext>
      </main>
    </div>
  );
}

export default App;
