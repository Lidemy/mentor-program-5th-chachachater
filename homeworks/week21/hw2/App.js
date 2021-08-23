import { Board } from "./components";
import React, { useState, useRef, useEffect } from "react";

function App() {
  return (
    <div className="game">
      <div className="game-board">
        <Board size={19} />
      </div>
    </div>
  );
}

export default App;
