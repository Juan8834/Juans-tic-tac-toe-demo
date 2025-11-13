import React, { useState, useEffect, useCallback } from 'react';
import Board from './Board';
import confetti from 'canvas-confetti';
import './Game.css';

const Game = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0, Draw: 0 });
  const [winnerAnnounced, setWinnerAnnounced] = useState(false);
  const [isVsComputer, setIsVsComputer] = useState(false); // 🧠 new toggle

  const handleClick = useCallback((i) => {
    const historyCopy = history.slice(0, stepNumber + 1);
    const current = historyCopy[historyCopy.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares)?.winner || squares[i]) return;

    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(historyCopy.concat([{ squares }]));
    setStepNumber(historyCopy.length);
    setXIsNext(!xIsNext);
  }, [history, stepNumber, xIsNext]);

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const current = history[stepNumber];
  const winnerInfo = calculateWinner(current.squares);

  useEffect(() => {
    if (winnerInfo?.winner && !winnerAnnounced) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: winnerInfo.winner === 'X' ? ['#ff3b3b', '#ffffff'] : ['#1fddff', '#ffffff'],
      });

      setScore((prev) => ({
        ...prev,
        [winnerInfo.winner]: prev[winnerInfo.winner] + 1,
      }));

      setWinnerAnnounced(true);
    } else if (!winnerInfo && current.squares.every(Boolean) && !winnerAnnounced) {
      setScore((prev) => ({ ...prev, Draw: prev.Draw + 1 }));
      setWinnerAnnounced(true);
    }
  }, [winnerInfo, current.squares, winnerAnnounced]);

  // 🤖 Computer move logic
  useEffect(() => {
    if (
      isVsComputer &&
      !winnerInfo &&
      !winnerAnnounced &&
      !xIsNext // Computer plays as O
    ) {
      const timeout = setTimeout(() => {
        const currentSquares = current.squares.slice();
        const availableMoves = currentSquares
          .map((val, idx) => (val === null ? idx : null))
          .filter((val) => val !== null);

        if (availableMoves.length > 0) {
          const randomMove =
            availableMoves[Math.floor(Math.random() * availableMoves.length)];
          handleClick(randomMove);
        }
      }, 600);

      return () => clearTimeout(timeout);
    }
  }, [isVsComputer, xIsNext, winnerInfo, winnerAnnounced, current, handleClick]);

  const resetGame = () => {
    setHistory([{ squares: Array(9).fill(null) }]);
    setStepNumber(0);
    setXIsNext(true);
    setWinnerAnnounced(false);
  };

  const toggleMode = () => {
    resetGame();
    setIsVsComputer(!isVsComputer);
  };

  let status;
  if (winnerInfo?.winner) {
    status = <span className="winner">🎉 Winner: {winnerInfo.winner} 🎉</span>;
  } else if (!current.squares.includes(null)) {
    status = <span className="draw">Draw!</span>;
  } else {
    status = (
      <span className={xIsNext ? 'x-turn' : 'o-turn'}>
        Next player: {xIsNext ? 'X' : 'O'}
      </span>
    );
  }

  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="scoreboard">
        <div>X Wins: {score.X}</div>
        <div>O Wins: {score.O}</div>
        <div>Draws: {score.Draw}</div>
      </div>

      <button className="mode-btn" onClick={toggleMode}>
        {isVsComputer ? 'Switch to 2 Players' : 'Play vs Computer 🤖'}
      </button>

      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={handleClick}
          winningSquares={winnerInfo?.line || []}
        />
      </div>

      <div className="game-info">
        <div>{status}</div>
        <button className="reset-btn" onClick={resetGame}>
          Restart Game
        </button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line };
    }
  }
  return null;
};

export default Game;
