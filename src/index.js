import ChessBoard from "./display/ChessBoard.js";
import { BLACK, WHITE } from "./engine/constants.js";
import { modal } from "./utilities.js";
import Square from "./engine/Square.js";
import King from "./engine/chess-pieces/King.js";
import Queen from "./engine/chess-pieces/Queen.js";
import Rook from "./engine/chess-pieces/Rook.js";
import Bishop from "./engine/chess-pieces/Bishop.js";
import Knight from "./engine/chess-pieces/Knight.js";
import Pawn from "./engine/chess-pieces/Pawn.js";

let board;
const defaultBackRow = [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook];

document.querySelector("#new-game-btn").addEventListener("click", () => {
  modal("Are you sure you want to restart ?", "Your current game will be lost", "Yes", newGame, "No");
});

export function newGame() {
  board = new ChessBoard();
  for (let i = 0; i < 8; i++) {
    board.add(new defaultBackRow[i](WHITE, new Square(i, 0)));
    board.add(new defaultBackRow[i](BLACK, new Square(i, 7)));
    board.add(new Pawn(WHITE, new Square(i, 1)));
    board.add(new Pawn(BLACK, new Square(i, 6)));
  }
  board.start();
}

newGame();