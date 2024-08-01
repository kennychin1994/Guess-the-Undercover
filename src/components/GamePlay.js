import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GamePlay({
  players,
  assignedWords,
  setAssignedWords,
  setEliminatedPlayers,
}) {
  const [round, setRound] = useState(1);
  const [remainingUndercover, setRemainingUndercover] = useState(0);
  const [remainingNormal, setRemainingNormal] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState("");
  const [localEliminatedPlayers, setLocalEliminatedPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [viewingWord, setViewingWord] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [eliminationMessage, setEliminationMessage] = useState("");
  const [firstSpeaker, setFirstSpeaker] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const undercovers = assignedWords.filter(
      (player) => player.role === "undercover"
    ).length;
    const normals = assignedWords.length - undercovers;
    setRemainingUndercover(undercovers);
    setRemainingNormal(normals);
  }, [assignedWords]);

  useEffect(() => {
    const chooseRandomSpeaker = () => {
      const survivingPlayers = assignedWords.filter(
        (player) => !localEliminatedPlayers.includes(player.name)
      );
      const randomIndex = Math.floor(Math.random() * survivingPlayers.length);
      setFirstSpeaker(survivingPlayers[randomIndex].name);
    };

    chooseRandomSpeaker();
  }, [round, assignedWords, localEliminatedPlayers]);

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
          `All undercovers have been eliminated!\n\nNormal word: <strong>${normalWord}</strong>\nUndercover word: <strong>${undercoverWord}</strong>`
        );
      }
    } else {
      setRemainingNormal((prev) => prev - 1);
      if (remainingUndercover >= remainingNormal - 1) {
        const normalWord = assignedWords.find((p) => p.role === "normal").word;
        const undercoverWord = assignedWords.find(
          (p) => p.role === "undercover"
        ).word;
        setGameOver(true);
        setGameOverMessage(
          `Undercovers have succeeded!\n\nNormal word: <strong>${normalWord}</strong>\nUndercover word: <strong>${undercoverWord}</strong>`
        );
      }
    }

    if (!gameOver) {
      setEliminationMessage(
        `${selectedPlayer} has been eliminated, game continues`
      );
    }

    setSelectedPlayer(null);
    setRound((prev) => prev + 1);
  };

  const handleRestart = () => {
    setLocalEliminatedPlayers([]);
    setAssignedWords([]);
    navigate("/", { state: { players } });
  };

  const handleViewWord = () => {
    if (!selectedPlayer) return;
    setViewingWord(true);
    setFlipped(false);
  };

  const handleCardClick = () => {
    if (viewingWord) {
      if (flipped) {
        setViewingWord(false);
      } else {
        setFlipped(true);
      }
    }
  };

  return (
    <div className="container">
      <h1>Guess the Undercovers</h1>
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
          <p>Take turns describing the your word.</p>
          <p>
            Each round, we will help you choose a player to speak first, then
            continue clockwise.
          </p>
          <p>
            After everyone has spoken, vote and choose the person to eliminate.
          </p>
          <p>
            Eliminate the chosen player by clicking the player's name below.
          </p>
          <h2>Round {round}</h2>
          <p>First Player to Speak: {firstSpeaker}</p>
          <div className="player-list">
            {assignedWords.map((player) => (
              <div
                key={player.name}
                className={`player-box ${
                  selectedPlayer === player.name ? "selected" : ""
                } ${
                  localEliminatedPlayers.includes(player.name) ? "disabled" : ""
                }`}
                onClick={() =>
                  !localEliminatedPlayers.includes(player.name) &&
                  handleVote(player.name)
                }
              >
                {player.name}
              </div>
            ))}
          </div>
          {eliminationMessage && (
            <div className="elimination-message">{eliminationMessage}</div>
          )}
          <button onClick={handleElimination} disabled={!selectedPlayer}>
            Eliminate Player
          </button>
          <button onClick={handleViewWord} disabled={!selectedPlayer}>
            View Word
          </button>
        </div>
      )}
      <button onClick={handleRestart}>Restart</button>

      {viewingWord && (
        <div className="overlay" onClick={handleCardClick}>
          <div className={`card ${flipped ? "flipped" : ""}`}>
            <div className="card-face card-front">
              <h2>{selectedPlayer}</h2>
            </div>
            <div className="card-face card-back">
              <p>
                {
                  assignedWords.find((player) => player.name === selectedPlayer)
                    ?.word
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GamePlay;
