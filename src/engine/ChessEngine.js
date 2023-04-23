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
    this.board = squareMatrix(8);
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
    if (square.x < 0 || square.x >= 8 ||
      square.y < 0 || square.y >= 8) {
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

  /**
   * Updates all pieces on the board.
   * 
   * Each piece will update it's list of targets and legal moves
   */
  update() {
    Object.values(this.pieces).forEach(army => {
      army.forEach(piece => piece.update());
    });
  }

  /**
   * Updates the list of legal moves of all pieces on the board according to check situations.
   */
  updateChecks() {
    this.getKings().forEach((king) => {
      this.checks[king.color] = [];

      this.pieces[oppositeColor(king.color)].forEach(enemy => {
        for (const target of enemy.targets) {
          if (target.name === king.pos.name) {
            enemy.updateCheckBreakers();
            this.checks[king.color].push(enemy);
            return;
          }
        }
      });
    });

    Object.values(this.pieces).forEach(army => {
      army.forEach(piece => piece.updateLegalMovesWhenChecked());
    });
  }

  /**
   * attempt moving a chess piece from current position to destination position on the board
   * @param {ChessPiece} piece 
   * @param {Square} destination
   * @returns 
   */
  movePiece(piece, destination) {
    if (!(piece instanceof ChessPiece)) {
      throw new TypeError(`invalid argument: ${piece} is not a ChessPiece`);
    }
    if (!(destination instanceof Square)) {
      throw new TypeError(`invalid argument: ${destination} is not a Square`);
    }
    if (piece.color !== this.turn) {
      throw new IllegalMoveError(`${this.turn} to play`);
    }
    const takenPiece = piece.move(destination);
    const opponent = oppositeColor(this.turn);

    this.update();
    this.updateChecks();

    if (this.isCheckmate(opponent)) {
      this.winner = this.turn;
    }

    /**
     * temporary measure : discovered check is checkMate
     * TODO: implement pins and prevent discovered check for current player
     */
    if (this.isKingChecked(this.turn)) {
      this.winner = opponent;
    }

    this.turn = opponent;

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

  isKingChecked(color) {
    return this.checks[color].length > 0;
  }

  isCheckmate(color) {
    if (!this.isKingChecked(color)) return false;

    if (this.pieces[color].every(p => p.legalMoves.length === 0)) {
      return true;
    }

    return false;
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
