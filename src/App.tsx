import { GameProvider } from './contexts/GameContext';

import './App.css';

function App() {
  return (
    <GameProvider>
      <div className="container">
        <nav className="topnav">
          <h1>Solitaire</h1>
          <button>Undo</button>
          <button>Reset</button>
        </nav>
        <main className="content">
          <section className="stock"></section>
          <section className="tableau"></section>
          <section className="foundation"></section>
        </main>
      </div>
    </GameProvider>
  );
}

export default App;
