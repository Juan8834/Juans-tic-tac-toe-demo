## Juan's Tic-Tac-Toe Demo 🎮

Live Demo

An interactive Tic-Tac-Toe game built with React, featuring animated Xs and Os, glowing UI, responsive design, and optional play against the computer. Perfect for showcasing React state management, component architecture, and fun UI animations.

## Features ✨

2 Modes: Play against a friend or a simple AI 🤖

Animated Xs and Os: Glowing and scaling effects for each move

Confetti Celebration: Visual feedback when a player wins 🎉

Scoreboard: Tracks wins, losses, and draws

Move History: Jump back to any previous move

Reset & Mode Toggle: Restart the game or switch modes at any time

Responsive Design: Fully playable on desktop, tablet, and mobile

Modern UI: Clean board design, glowing titles, and interactive buttons

```

Installation & Setup 🛠️

Clone the repository:

git clone https://github.com/Juan8834/Juans-tic-tac-toe-demo.git
cd Juans-tic-tac-toe-demo

Install dependencies:

npm install

Start the development server:

npm start

Open http://localhost:3000
 to view the game in your browser.
```
## Deployment 🚀

This project is deployed via GitHub Pages:

npm run deploy

Your live demo will be available at:
https://Juan8834.github.io/Juans-tic-tac-toe-demo

## Technologies Used 🧰

React 18 – Frontend library

Canvas-Confetti – Confetti animation on win

CSS3 – Animations, transitions, and responsive design

GitHub Pages – Hosting the live demo

## Game Logic Overview 🧠

The game maintains a history of board states using React useState.

Determines winners by checking all possible winning lines.

Supports undo moves via move history buttons.

Optional computer AI plays as "O" in vs Computer mode (random valid move).

Winning line is highlighted, and a confetti effect is triggered on win.

## Future Improvements 💡

Smarter AI using minimax algorithm

Dark/Light mode toggle

Sound effects for moves and wins

Animations for draw results

GitHub: Juan8834

Portfolio: juan8834-github-io.vercel.app
