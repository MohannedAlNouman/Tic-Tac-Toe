import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {
  updateBoard,
  resetBoard,
  selectBoard,
  selectStatus,
  selectWinningSquares
} from "../reducers/gameSlice";
import victorySound from "../assets/monkeyVictorySound.wav";

function Board() {
  const board = useSelector(selectBoard);
  const status = useSelector(selectStatus);
  const winningSquares = useSelector(selectWinningSquares);
  const dispatch = useDispatch();
  const vicSnd = new Audio(victorySound);

  useEffect(() => {
    vicSnd.play();
  }, [winningSquares]);

  let handleClick = e => {
    e.preventDefault();
    let eTarget = e.target.dataset;
    dispatch(updateBoard({row: eTarget.row, col: eTarget.col}));
  };

  let displayBoard = () => {
    return (
      <table>
        {board.map((row, r) => {
          return (
            <tr>
              {row.map((m, c) => {
                let winningSquaresStr = JSON.stringify(winningSquares);
                let winSq = winningSquaresStr.includes(`[${r},${c}]`);
                return (
                  <td
                    className={winSq ? "victor" : ""}
                    data-row={r}
                    data-col={c}
                    onClick={e => {
                      handleClick(e);
                    }}
                  >
                    {m}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </table>
    );
  };

  return (
    <div>
      <h3>{status}</h3>
      <button
        onClick={() => {
          dispatch(resetBoard());
        }}
      >
        Reset board
      </button>
      {displayBoard()}
    </div>
  );
}

export default Board;
