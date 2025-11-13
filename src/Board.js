import React from 'react';
import Square from './Square';

const Board = ({ squares, onClick, winningSquares }) => {
  const renderSquare = (i) => (
    <Square
      key={i}
      value={squares[i]}
      onClick={() => onClick(i)}
      highlight={winningSquares.includes(i)}
    />
  );

  return (
    <div>
      {[0, 1, 2].map(row => (
        <div key={row} className="board-row">
          {[0, 1, 2].map(col => renderSquare(row * 3 + col))}
        </div>
      ))}
    </div>
  );
};

export default Board;
