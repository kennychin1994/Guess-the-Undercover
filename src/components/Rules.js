import React from "react";
import { useNavigate } from "react-router-dom";

function Rules() {
  const navigate = useNavigate();

  return (
    <div className="rules-container">
      <h1>Guess the Undercovers</h1>
      <h3>Welcome to "Guess the Undercovers"! Here are the rules:</h3>
      <div className="rules-text">
        <p>Each player will receive a word.</p>
        <p>
          One or more players will receive a different word and will be the
          undercover(s).
        </p>
        <p>
          Players take turns to describe their word without saying the word
          itself.
        </p>
        <p>
          After each round, players vote to eliminate one player who they think
          is the undercover.
        </p>
        <p>
          The game ends if all undercovers are eliminated or if the number of
          undercovers equals the number of normal players.
        </p>
      </div>
      <button onClick={() => navigate("/")}>Back to Main</button>
    </div>
  );
}

export default Rules;
