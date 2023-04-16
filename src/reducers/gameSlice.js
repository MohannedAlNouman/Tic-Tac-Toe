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
    moves: 0
  },
  reducers: {
    updateBoard: (state, action) => {
      let [row, col] = [action.payload.row, action.payload.col];
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
            }
          } else {
            break;
          }
        }

        //checks for horizontal victories
        for (let c = 0; !victorFound && c < 3; c++) {
          if (state.board[row][c] == mark) {
            if (c == 2) {
              victorFound = true;
            }
          } else {
            break;
          }
        }

        //checks for diagonal victories
        if (!victorFound && (row + col) % 2 == 0) {
          console.log(`row is ${row}`)
          console.log(`col is ${col}`)
          if (row == 1 && col == 1) {
            console.log("checking center tile")
            if (
              (state.board[0][0] == mark && state.board[2][2] == mark) ||
              (state.board[0][2] == mark && state.board[2][0] == mark)
            ) {
              victorFound = true;
            }
          } else if (row == col) {
            console.log("checking downwards diagnol")
            if (
              state.board[(row + 1) % 3][(col + 1) % 3] == mark &&
              state.board[(row + 2) % 3][(col + 2) % 3] == mark
            ) {
              victorFound = true;
            }
          } else if (
            state.board[(row + 1) % 3][Math.abs((col - 1) % 3)] == mark &&
            state.board[(row + 2) % 3][Math.abs((col - 2) % 3)] == mark
          ) {
            victorFound = true;
          }
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
    }
  }
});

const selectBoard = state => state.game.board;
const selectStatus = state => state.game.status;
export {selectBoard, selectStatus};

export const {updateBoard, resetBoard} = gameSlice.actions;

export default gameSlice.reducer;
