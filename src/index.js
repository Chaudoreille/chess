import ChessBoard from "./display/ChessBoard.js";
import { BLACK, WHITE, ROOK, BISHOP, KNIGHT, QUEEN, KING, PAWN } from "./engine/constants.js";
import { modal } from "./utilities.js";
import Square from "./engine/Square.js";

let board;
const defaultBackRow = [ROOK, KNIGHT, BISHOP, QUEEN, KING, BISHOP, KNIGHT, ROOK];

document.querySelector("#new-game-btn").addEventListener("click", event => {
  modal("Are you sure you want to restart ?", "Your current game will be lost", "Yes", newGame, "No");
});

export function newGame() {
  board = new ChessBoard();

  const pieces = [];

  for (let i = 0; i < 8; i++) {
    pieces.push({
      type: defaultBackRow[i],
      color: WHITE,
      position: new Square(i, 0)
    });
    pieces.push({
      type: PAWN,
      color: WHITE,
      position: new Square(i, 1)
    });
    pieces.push({
      type: defaultBackRow[i],
      color: BLACK,
      position: new Square(i, 7)
    });
    pieces.push({
      type: PAWN,
      color: BLACK,
      position: new Square(i, 6)
    });
  }
  board.populate(pieces);
  board.addEvents();
  board.render();
}

newGame();