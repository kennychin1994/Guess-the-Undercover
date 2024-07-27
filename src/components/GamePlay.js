import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GamePlay({
  players,
  assignedWords,
  setAssignedWords,
  setEliminatedPlayers,
}) {
  const [votes, setVotes] = useState({});
  const [round, setRound] = useState(1);
  const [remainingUndercover, setRemainingUndercover] = useState(0);
  const [remainingNormal, setRemainingNormal] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState("");
  const [localEliminatedPlayers, setLocalEliminatedPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const undercovers = assignedWords.filter(
      (player) => player.role === "undercover"
    ).length;
    const normals = assignedWords.length - undercovers;
    setRemainingUndercover(undercovers);
    setRemainingNormal(normals);
  }, [assignedWords]);

  const handleVote = (playerName) => {
    setSelectedPlayer(playerName);
  };

  const handleElimination = () => {
    if (!selectedPlayer) return;

    setLocalEliminatedPlayers((prev) => [...prev, selectedPlayer]);
    setEliminatedPlayers((prev) => [...prev, selectedPlayer]);

    const eliminatedPlayer = assignedWords.find(
      (player) => player.name === selectedPlayer
    );
    if (eliminatedPlayer.role === "undercover") {
      setRemainingUndercover((prev) => prev - 1);
      if (remainingUndercover - 1 === 0) {
        const normalWord = assignedWords.find((p) => p.role === "normal").word;
        const undercoverWord = assignedWords.find(
          (p) => p.role === "undercover"
        ).word;
        setGameOver(true);
        setGameOverMessage(
          `All undercovers have been eliminated!\nNormal word: <strong>${normalWord}</strong>\nUndercover word: <strong>${undercoverWord}</strong>`
        );
      }
    } else {
      setRemainingNormal((prev) => prev - 1);
      if (remainingNormal - 1 === 1) {
        const normalWord = assignedWords.find((p) => p.role === "normal").word;
        const undercoverWord = assignedWords.find(
          (p) => p.role === "undercover"
        ).word;
        setGameOver(true);
        setGameOverMessage(
          `Undercovers have successed!\nNormal word: <strong>${normalWord}</strong>\nUndercover word: <strong>${undercoverWord}</strong>`
        );
      }
    }

    setVotes({});
    setSelectedPlayer(null);
    setRound((prev) => prev + 1);
  };

  const handleRestart = () => {
    setLocalEliminatedPlayers([]);
    setAssignedWords([]);
    navigate("/", { state: { players } });
  };

  return (
    <div className="container">
      <h1>Game Play</h1>
      <button onClick={handleRestart}>Restart</button>
      {gameOver ? (
        <div>
          <h2>Game Over</h2>
          <p>
            {gameOverMessage.split("\n").map((msg, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 ? <br /> : null}
                {msg.includes("<strong>") ? (
                  <span dangerouslySetInnerHTML={{ __html: msg }} />
                ) : (
                  msg
                )}
              </React.Fragment>
            ))}
          </p>
        </div>
      ) : (
        <div>
          <h2>Round {round}</h2>
          <ul>
            {assignedWords.map(
              (player) =>
                !localEliminatedPlayers.includes(player.name) && (
                  <li
                    key={player.name}
                    onClick={() => handleVote(player.name)}
                    style={{
                      cursor: "pointer",
                      color: selectedPlayer === player.name ? "red" : "black",
                    }}
                  >
                    {player.name}
                  </li>
                )
            )}
          </ul>
          <button onClick={handleElimination} disabled={!selectedPlayer}>
            Eliminate Player
          </button>
        </div>
      )}
    </div>
  );
}

export default GamePlay;
