import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PlayerList from "./components/PlayerList";
import DisplayWords from "./components/DisplayWords";
import GamePlay from "./components/GamePlay";
import "./styles.css";

function App() {
  const [players, setPlayers] = useState([]);
  const [assignedWords, setAssignedWords] = useState([]);
  const [eliminatedPlayers, setEliminatedPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [numUndercovers, setNumUndercovers] = useState(1);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PlayerList
              players={players}
              setPlayers={setPlayers}
              numUndercovers={numUndercovers}
              setNumUndercovers={setNumUndercovers}
            />
          }
        />
        <Route
          path="/displaywords"
          element={
            <DisplayWords
              setAssignedWords={setAssignedWords}
              setGameStarted={setGameStarted}
              numUndercovers={numUndercovers}
              players={players}
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
              numUndercovers={numUndercovers}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
