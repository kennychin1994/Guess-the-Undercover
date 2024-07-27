import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PlayerList({ players, setPlayers }) {
  const [name, setName] = useState("");
  const [numUndercovers, setNumUndercovers] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const maxUndercovers = Math.floor(players.length / 3);
    if (numUndercovers > maxUndercovers) {
      setNumUndercovers(maxUndercovers);
    }
  }, [players, numUndercovers]);

  const addPlayer = () => {
    if (name) {
      setPlayers([...players, name]);
      setName("");
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
      <h1>Who is Undercover</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Player Name"
      />
      <button onClick={addPlayer}>Add Player</button>
      <ul>
        {players.map((player, index) => (
          <li key={index}>
            {player}
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
