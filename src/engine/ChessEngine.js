import { squareMatrix, oppositeColor } from "../utilities.js";
import { IllegalMoveError, BoundaryError } from "./error.js";
import ChessPiece from "./chess-pieces/ChessPiece.js";
import { WHITE, BLACK, ROOK, BISHOP, KNIGHT, QUEEN, KING, PAWN, Direction } from "./constants.js";
import King from "./chess-pieces/King.js";
import Queen from "./chess-pieces/Queen.js";
import Rook from "./chess-pieces/Rook.js";
import Bishop from "./chess-pieces/Bishop.js";
import Knight from "./chess-pieces/Knight.js";
import Pawn from "./chess-pieces/Pawn.js";
import Square from "./Square.js";

class ChessEngine {
  constructor(boardSize = 8) {
    this.boardSize = boardSize;
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
    this.board = squareMatrix(boardSize);
    this.turn = WHITE;
    this.winner = null;
  }

  /**
   * returns the ChessPiece at given position o the board
   * @param {Square} position 
   * @returns {ChessPiece} ChessPiece or null if empty square
   */
  getSquare(position) {
    return this.board[position.x][position.y];
  }

  /**
   * returns true if the square's coordinates are within the board's boundaries
   * @param {Square} square 
   * @returns Boolean
   */
  inBounds(square) {
    if (square.x < 0 || square.x >= this.boardSize ||
      square.y < 0 || square.y >= this.boardSize) {
      return false;
    }
    return true;
  }

  /**
   * raises a BoundaryError if the square's coordinates are out of board's boundaries
   * @param {Square} square 
   * @throws {BoundaryError}
   */
  assertInBounds(square) {
    if (!this.inBounds(square)) {
      throw new BoundaryError(`[${square.x}, ${square.y}] is out of bounds`);
    }
    return;
  }

  /**
   * returns an array containing both kings
   * @returns {Array<King>} Both kings
   */
  getKings() {
    return Object.values(this.kings);
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
   * @param {ChessPiece} piece 
   * @param {Square} position
   * @returns 
   */
  movePiece(piece, position) {
    if (!(piece instanceof ChessPiece)) {
      throw new TypeError(`invalid argument: ${piece} is not a ChessPiece`);
    }
    if (!(position instanceof Square)) {
      throw new TypeError(`invalid argument: ${position} is not a Square`);
    }
    if (piece.color !== this.turn) {
      throw new IllegalMoveError(`${this.turn} to play`);
    }
    const takenPiece = piece.move(position);

    this.update();
    this.updateChecks();

    for (let color in this.pieces) {
      if (this.pieces[color].every(p => p.legalMoves.length === 0)) {
        this.winner = oppositeColor(color);
      }
    }

    /**
     * temporary measure : discovered check is checkMate
     */
    if (this.kings[this.turn].isCheck()) {
      this.winner = oppositeColor(this.turn);
    }

    this.turn = oppositeColor(this.turn);

    return takenPiece;
  }

  /**
   * returns list of legal moves for the piece in given position
   * @param {Square} position 
   */
  legalMoves(position) {
    const piece = this.board[position.x][position.y];

    if (piece === null || !piece instanceof ChessPiece) {
      return [];
    } else {
      return [...piece.legalMoves];
    }
  }

  addPiece(type, color, square) {
    const classes = {
      [KING]: King,
      [QUEEN]: Queen,
      [BISHOP]: Bishop,
      [KNIGHT]: Knight,
      [ROOK]: Rook,
      [PAWN]: Pawn,
    };
    this.assertInBounds(square);
    const piece = new classes[type](this, color, square, type);

    this.board[square.x][square.y] = piece;
    this.pieces[color].push(piece);

    return this;
  }
}
export default ChessEngine;
