Guess the Undercover
"Guess the Undercover" is a web-based implementation of the popular party game "Who is the Undercover?". This application allows users to host and play the game online with friends. The game is built using React for the frontend, with a focus on simplicity and ease of use.

Table of Contents
Features
Installation
Usage
Game Rules
Project Structure
Contributing
License
Features
Host and join games online.
User-friendly interface with simple navigation.
Customizable game settings (number of undercovers, number of players, etc.).
Real-time game updates for all players.
Responsive design for use on both desktop and mobile devices.
Installation
To run this project locally, follow these steps:

Clone the repository:

bash
複製程式碼
git clone https://github.com/kennychin1994/Guess-the-Undercover.git
cd Guess-the-Undercover
Install dependencies:

Make sure you have Node.js installed, then run:

bash
複製程式碼
npm install
Start the development server:

bash
複製程式碼
npm start
Open your browser and navigate to http://localhost:3000 to view the app.

Usage
Starting a New Game:

Click on "Start New Game" on the homepage.
Set up your game by choosing the number of players, the number of undercovers, and other settings.
Share the game code with your friends so they can join.
Joining a Game:

Enter the game code provided by the host on the homepage.
Wait for the host to start the game.
Playing the Game:

Once the game starts, each player will receive a word. The goal for normal players is to identify and eliminate the undercover, while the undercover must avoid detection.
Players take turns describing their word, and after each round, a player is voted out.
The game ends when the undercover is identified or when the undercovers outnumber the normal players.
Game Rules
"Guess the Undercover" follows these basic rules:

Word Assignment: At the start of the game, each player receives a word. Most players receive the same word (normal players), but the undercover(s) receive a different word that is similar but not identical.

Description: Players take turns describing their word without revealing it directly. The aim is to be vague enough to avoid being identified by the undercover but clear enough to prove you're a normal player.

Voting: After each round of descriptions, players vote on who they believe is the undercover. The player with the most votes is eliminated.

Winning the Game: The game ends when the undercover(s) are eliminated, or when the number of undercovers equals or exceeds the number of normal players.

Project Structure
The project is structured as follows:

php
複製程式碼
Guess-the-Undercover/
│
├── public/                 # Static files
│   ├── index.html          # HTML template
│   └── ...
│
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/              # React components representing different pages
│   ├── hooks/              # Custom React hooks
│   ├── App.js              # Main application component
│   ├── index.js            # Entry point for React
│   └── ...
│
├── .gitignore              # Files and directories to ignore in git
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
Contributing
Contributions are welcome! If you have suggestions for new features or improvements, feel free to open an issue or submit a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for details.
