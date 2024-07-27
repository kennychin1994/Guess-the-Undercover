import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { wordSets } from "./wordSets";

function DisplayWords({ setAssignedWords, setGameStarted }) {
  const { state } = useLocation();
  const { players, numUndercovers } = state;
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [assignedWords, setLocalAssignedWords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (players.length > 0) {
      const randomWordSet =
        wordSets[Math.floor(Math.random() * wordSets.length)];
      let undercoverIndices = [];
      while (undercoverIndices.length < numUndercovers) {
        const index = Math.floor(Math.random() * players.length);
        if (!undercoverIndices.includes(index)) {
          undercoverIndices.push(index);
        }
      }
      const assigned = players.map((player, index) => ({
        name: player,
        word: undercoverIndices.includes(index)
          ? randomWordSet.undercover
          : randomWordSet.normal,
        role: undercoverIndices.includes(index) ? "undercover" : "normal",
      }));
      setAssignedWords(assigned);
      setLocalAssignedWords(assigned);
    }
  }, [players, numUndercovers, setAssignedWords]);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleNext = () => {
    if (flipped) {
      setFlipped(false);
      setTimeout(() => {
        if (currentPlayerIndex < players.length - 1) {
          setCurrentPlayerIndex((prevIndex) => prevIndex + 1);
        } else {
          setGameStarted(true);
          navigate("/gameplay");
        }
      }, 600); // Match the CSS transition duration
    } else {
      if (currentPlayerIndex < players.length - 1) {
        setCurrentPlayerIndex((prevIndex) => prevIndex + 1);
      } else {
        setGameStarted(true);
        navigate("/gameplay");
      }
    }
  };

  const handleRestart = () => {
    setAssignedWords([]);
    navigate("/", { state: { players } });
  };

  return (
    <div className="container">
      <h1>Display Words</h1>
      <button onClick={handleRestart}>Restart</button>
      {currentPlayerIndex < players.length ? (
        <div>
          <div className="card-container" onClick={handleFlip}>
            <div className={`card ${flipped ? "flipped" : ""}`}>
              <div className="card-face card-front">
                <h2>{assignedWords[currentPlayerIndex]?.name}</h2>
              </div>
              <div className="card-face card-back">
                <p>{assignedWords[currentPlayerIndex]?.word}</p>
              </div>
            </div>
          </div>
          <button onClick={handleNext}>Next</button>
        </div>
      ) : (
        <p>All players have seen their words. The game will now start.</p>
      )}
    </div>
  );
}

export default DisplayWords;
