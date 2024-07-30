import React from "react";
import { useNavigate } from "react-router-dom";

function Rules() {
  const navigate = useNavigate();

  return (
    <div className="rules-container">
      <h1>Guess the Undercovers</h1>
      <h3>Welcome to "Guess the Undercovers"! Here are the rules:</h3>
      <div className="rules-text">
        <p>Each player gets a word.</p>
        <p>One or more players get a different word and are the undercovers.</p>
        <p>
          Players take turns to describe their word without saying the word
          itself.
        </p>
        <p>
          After each round, players vote to eliminate one player they suspect is
          an undercover.
        </p>
        <p>The game ends when:</p>
        <p className="tab">All undercovers are eliminated, or</p>
        <p className="tab">
          The number of undercovers equals the number of normal players.
        </p>
      </div>
      <button onClick={() => navigate("/")}>Back to Main</button>
    </div>
  );
}

export default Rules;
