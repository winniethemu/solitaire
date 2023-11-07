import { DragDropContext } from '@hello-pangea/dnd';

import Tableau from './components/Tableau/Tableau';

import styles from './App.module.css';

function App() {
  function handleDragEnd(result) {
    /* TODO */
  }

  return (
    <div className={styles.container}>
      <nav className={styles.topnav}>
        <h1>Solitaire</h1>
        <button>Undo</button>
        <button>Reset</button>
      </nav>
      <main className={styles.content}>
        <DragDropContext onDragEnd={handleDragEnd}>
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
