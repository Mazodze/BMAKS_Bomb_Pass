# BMAKS Bomb Pass 💣

A complete multiplayer bomb-passing quiz game.

## Features

- Multiplayer Socket.IO rooms
- 4-character room codes
- Up to 8 players
- Host and ready system
- Server-controlled 12-second bomb timer
- 30 built-in questions
- Random non-repeating questions
- Four multiple-choice answers
- Correct answer passes the bomb
- Wrong answer causes an explosion
- Timeout causes an explosion
- Eliminated players remain visible
- Last player standing wins
- Play Again
- Responsive mobile/desktop UI

## Run

1. Install Node.js.
2. Open a terminal in this folder.
3. Run:

npm install

4. Then:

npm start

5. Open:

http://localhost:3000

For multiplayer on the same Wi-Fi, other players can use your computer's local IP address followed by :3000.

## Deploy

This project is ready for Node hosting such as Render or another Node.js service.

The server uses process.env.PORT when supplied by the hosting provider.

## Game rules

- Each turn lasts 12 seconds.
- The player holding the bomb receives a question.
- Correct answer: bomb passes to the next active player.
- Wrong answer: player explodes and is eliminated.
- Time reaching zero: player explodes and is eliminated.
- When only one active player remains, that player wins.
