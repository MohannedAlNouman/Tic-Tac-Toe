import {createSlice} from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    board: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ],
    mark: "X",
    status: "In progress",
    moves: 0,
    winningSquares: []
  },
  reducers: {
    updateBoard: (state, action) => {
      let [row, col] = [
        parseInt(action.payload.row),
        parseInt(action.payload.col)
      ];
      let mark = state.mark;

      //checks if current cell is empty and if the game is still in progress (as opposed to someone winning or a draw)
      if (state.board[row][col] == "" && state.status == "In progress") {
        state.board[row][col] = mark;
        state.moves++;
        if (mark == "X") {
          state.mark = "O";
        } else {
          state.mark = "X";
        }

        //checks for victory or draw
        let victorFound = false;

        //checks for vertical victories
        for (let r = 0; r < 3; r++) {
          if (state.board[r][col] == mark) {
            if (r == 2) {
              victorFound = true;
              state.winningSquares = [
                ...state.winningSquares,
                [r, col],
                [r - 1, col],
                [r - 2, col]
              ];
            }
          } else {
            break;
          }
        }

        //checks for horizontal victories
        for (let c = 0; c < 3; c++) {
          if (state.board[row][c] == mark) {
            if (c == 2) {
              victorFound = true;
              state.winningSquares = [
                ...state.winningSquares,
                [row, c],
                [row, c - 1],
                [row, c - 2]
              ];
            }
          } else {
            break;
          }
        }

        //checks for diagonal victories
        if (
          state.board[0][0] == mark &&
          state.board[1][1] == mark &&
          state.board[2][2] == mark
        ) {
          victorFound = true;
          state.winningSquares = [
            ...state.winningSquares,
            [0, 0],
            [1, 1],
            [2, 2]
          ];
        } else if (
          state.board[0][2] == mark &&
          state.board[1][1] == mark &&
          state.board[2][0] == mark
        ) {
          victorFound = true;
          state.winningSquares = [
            ...state.winningSquares,
            [0, 2],
            [1, 1],
            [2, 0]
          ];
        }

        //announces victor if any, or draw if 9 moves have been played
        if (victorFound) {
          state.status = `${mark} is victorious!`;
        } else if (state.moves == 9) {
          state.status = "Draw!";
        }
      }
    },
    resetBoard: state => {
      state.board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ];
      state.mark = "X";
      state.status = "In progress";
      state.moves = 0;
      state.winningSquares = []
    }
  }
});

const selectBoard = state => state.game.board;
const selectStatus = state => state.game.status;
const selectWinningSquares = state => state.game.winningSquares;
export {selectBoard, selectStatus, selectWinningSquares};

export const {updateBoard, resetBoard} = gameSlice.actions;

export default gameSlice.reducer;
