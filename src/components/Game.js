import React, { useState } from "react";
import { calculateWinner } from "../helper";
import Board from "./Board";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(history[stepNumber]);
  const xO = xIsNext ? "X" : "♥";

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
    // return if won or occupied
    if (winner || squares[i]) return;
    // select square
    squares[i] = xO;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Go to move #${move}` : "New Game";
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });

  return (
    
    <>
     <h1>TIC TAC TOE</h1>  
     
     <div >

  <div id="DIV_0" className="info-wrapper">
    <div id="DIV_1"> <h3>{winner ? "Winner: " + winner : "Next Player: " + xO}</h3></div>
    <div>
          <h3>History</h3>
          {renderMoves()}
        </div>
  </div>

  <div id="DIV_3">
  <Board squares={history[stepNumber]} onClick={handleClick} />
  </div>

</div>   
     
   
    </>
  );
};

export default Game;
