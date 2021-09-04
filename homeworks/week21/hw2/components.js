import React, { useState, useRef, useEffect } from "react";
import './App.css'

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

function Board(props) {
  const squares = []
  for (let i = 0; i < props.size; i++) {
    const row = []
    for (let j = 0; j < props.size; j++) {
      row.push(null)
    }
    squares.push(row)
  }
  const [state, setState] = useState({ 
    squares,
    xIsNext: true,
  })
  const [winner, setWinner] = useState(null)

  function handleClick(y, x) {
    const squares = state.squares
    if (squares[y][x]) return
    if (winner) return
    squares[y][x] = state.xIsNext ? '●' : '○'
    setState({
      squares,
      xIsNext: !state.xIsNext})
    if (checkWinner(squares, y, x)) {
      setWinner(squares[y][x])
      return
    }
  }

  function renderSquare(y, x) {
    return (<Square value={state.squares[y][x]} onClick={() => (handleClick(y, x))}/>)
  }
  let status
  if(winner) {
    status = 'Winner: ' + winner
  } else {
    status = 'Next player: ' + (state.xIsNext ? '●' : '○')
  }
  return (
    <div>
      <div className="status">{status}</div>
      {squares.map((each, rowIndex) => {
        return(
          <div className="board-row">
            {squares.map((each, colIndex) => {
              return renderSquare(rowIndex, colIndex)
            })}
          </div>
        )
      })}
    </div>
  );
}

function checkWinner(squares, currentY, currentX) {
  return (
    getContinousChess(squares, currentY, currentX, 1, 0) + getContinousChess(squares, currentY, currentX, -1, 0) >= 4 ||
    getContinousChess(squares, currentY, currentX, 0, 1) + getContinousChess(squares, currentY, currentX, 0, -1) >= 4 ||
    getContinousChess(squares, currentY, currentX, 1, 1) + getContinousChess(squares, currentY, currentX, -1, -1) >= 4 ||
    getContinousChess(squares, currentY, currentX, -1, 1) + getContinousChess(squares, currentY, currentX, 1, -1) >= 4
  )
}

function getContinousChess(squares, currentY, currentX, nextX, nextY) {
  const currentColor = squares[currentY][currentX]
  let tmpX = currentX + nextX
  let tmpY = currentY + nextY
  let total = 0

  if (tmpX < 0) return 0
  if (tmpY < 0) return 0
  if (tmpX > squares.length - 1) return 0
  if (tmpY > squares.length - 1) return 0

  while (squares[tmpY][tmpX] === currentColor) {
    total++
    tmpX += nextX
    tmpY += nextY
    if (tmpX < 0) return total
    if (tmpY < 0) return total
    if (tmpX > squares.length - 1) return total
    if (tmpY > squares.length - 1) return total
  }
  return total;
}

export { Board };
