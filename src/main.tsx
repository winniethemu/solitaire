import React from 'react';
import ReactDOM from 'react-dom/client';

import { GameProvider } from './contexts/GameContext';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </React.StrictMode>
);
