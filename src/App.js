import React from 'react';
import Game from './Game';
import './Game.css'; // Ensure Game.css or App.css is imported if not already

function App() {
  return (
    <div className="App">
      <h1 className="glow-title">Juan's Tic-Tac-Toe Game</h1>
      <Game />
    </div>
  );
}

export default App;
