import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {
  updateBoard,
  resetBoard,
  selectBoard,
  selectStatus
} from "../reducers/gameSlice";

function Board() {
  const board = useSelector(selectBoard);
  const status = useSelector(selectStatus);
  const dispatch = useDispatch();

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
                return (
                  <td
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
      <button onClick={() => dispatch(resetBoard())}>Reset board</button>
      {displayBoard()}
    </div>
  );
}

export default Board;
