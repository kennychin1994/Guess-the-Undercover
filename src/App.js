import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PlayerList from "./components/PlayerList";
import DisplayWords from "./components/DisplayWords";
import GamePlay from "./components/GamePlay";
import "./styles.css"; // Ensure styles.css is imported

function App() {
  const [players, setPlayers] = useState([]);
  const [assignedWords, setAssignedWords] = useState([]);
  const [eliminatedPlayers, setEliminatedPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<PlayerList players={players} setPlayers={setPlayers} />}
        />
        <Route
          path="/displaywords"
          element={
            <DisplayWords
              setAssignedWords={setAssignedWords}
              setGameStarted={setGameStarted}
            />
          }
        />
        <Route
          path="/gameplay"
          element={
            <GamePlay
              players={players}
              assignedWords={assignedWords}
              setAssignedWords={setAssignedWords}
              eliminatedPlayers={eliminatedPlayers}
              setEliminatedPlayers={setEliminatedPlayers}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
