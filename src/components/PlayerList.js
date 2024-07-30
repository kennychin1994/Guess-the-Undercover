import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PlayerList({
  players,
  setPlayers,
  numUndercovers,
  setNumUndercovers,
}) {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const maxUndercovers = Math.floor(players.length / 3);
    if (numUndercovers > maxUndercovers) {
      setNumUndercovers(maxUndercovers > 0 ? maxUndercovers : 1);
    } else if (numUndercovers < 1 && players.length >= 3) {
      setNumUndercovers(1);
    }
  }, [players, numUndercovers, setNumUndercovers]);

  const addPlayer = () => {
    if (name && !players.includes(name)) {
      setPlayers([...players, name]);
      setName("");
    } else {
      alert("Player name must be unique and not empty");
    }
  };

  const deletePlayer = (index) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const startGame = () => {
    if (players.length >= 3) {
      navigate("/displaywords", { state: { players, numUndercovers } });
    }
  };

  const increaseUndercovers = () => {
    const maxUndercovers = Math.floor(players.length / 3);
    setNumUndercovers((prev) => Math.min(prev + 1, maxUndercovers));
  };

  const decreaseUndercovers = () => {
    setNumUndercovers((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Guess the Undercovers</h1>
        <button className="rules-button" onClick={() => navigate("/rules")}>
          Rules
        </button>
      </div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Player's Name"
      />
      <button onClick={addPlayer}>Add Player</button>
      <ul>
        {players.map((player, index) => (
          <li key={index}>
            <span>{player}</span>
            <button onClick={() => deletePlayer(index)}>Delete</button>
          </li>
        ))}
      </ul>
      {players.length >= 3 && (
        <div>
          <label>Number of Undercovers: </label>
          <button onClick={decreaseUndercovers}>-</button>
          <span>{numUndercovers}</span>
          <button onClick={increaseUndercovers}>+</button>
        </div>
      )}
      <button onClick={startGame} disabled={players.length < 3}>
        Start Game
      </button>
    </div>
  );
}

export default PlayerList;
