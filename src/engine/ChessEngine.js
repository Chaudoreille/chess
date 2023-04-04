import * as utils from "../utilities.js";
import ChessPiece from "./chess-pieces/ChessPiece.js";
import { WHITE, BLACK, KING, Direction } from "./constants.js";

class ChessEngine {
  constructor() {
    this.kings = {
      [WHITE]: null,
      [BLACK]: null,
    };
    this.pieces = {
      [WHITE]: [],
      [BLACK]: [],
    };
    this.checks = {
      [WHITE]: [],
      [BLACK]: [],
    };
    this.directions = {
      [WHITE]: Direction.UP,
      [BLACK]: Direction.DOWN
    };
    this.taken = {
      [WHITE]: [],
      [BLACK]: [],
    };
    this.collisions = utils.squareMatrix(8);
    this.turn = WHITE;
  }

  update() {
    this.pieces[WHITE].forEach(piece => piece.update());
    this.pieces[BLACK].forEach(piece => piece.update());
  }

  updateChecks() {
    Object.values(this.kings).forEach((king) => {
      king.getChecks();
    });

    this.pieces[WHITE].forEach(piece => piece.breakChecks());
    this.pieces[BLACK].forEach(piece => piece.breakChecks());
  }

  /**
   * attempt moving a chess piece from <start> position to <end> position on the board
   * @param {Square} start 
   * @param {Square} end 
   * @returns 
   */
  movePiece(start, end) {
    const piece = this.collisions[start.x][start.y];
    const target = this.collisions[end.x][end.y];

    if (!piece) {
      return false; // error: no piece found
    }
    if (piece.color !== this.turn) {
      return false; // error: wrong player
    }
    if (target.color === this.turn) {
      return false; // error: Illegal move, square occupied by allied piece
    }
    try {
      piece.move(target);
    } catch (error) {
      if (error.message === "Illegal Move") {
        return false; // actually throw illegal move exception ?
      }
    }

    Object.values(this.kings).forEach((king) => {
      if (king.isCheck()) {
        return true; // mention that specific king is checked 
      }
    });
  }

  /**
   * returns list of legal moves for the piece in given position
   * @param {Square} position 
   */
  legalMoves(position) {
    const piece = this.collisions[position.x][position.y];

    if (piece === null || !piece instanceof ChessPiece) {
      return [];
    } else {
      return [...piece.legalMoves];
    }
  }

  addPiece(type, color, position) {
    const chessPiece = utils.chessPieceFactory(this, type, color, position);
  }
}
export default ChessEngine;
