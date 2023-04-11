import Square from "../Square.js";
import { IllegalMoveError } from "../error.js";
import { oppositeColor } from "../../utilities.js";
import { KING, PAWN } from "../constants.js";

class ChessPiece {
  constructor(gameEngine, color, square) {
    this.engine = gameEngine;

    this.color = color;
    this.type = null;
    this.pos = square;

    this.legalMoves = [];
    this.targets = [];
    this.checkBreakers = [];

    this.dom = this.createDomChessPiece();
  }

  update() {
    this.legalMoves = [];
    this.targets = [];
  }

  /**
   * moves chess piece on the board
   * @throws 
   *  - TypeError
   *  - IllegalMoveError
   * @param {Square} square
   * @returns {ChessPiece} taken piece or null
   */
  move(square) {
    if (!this.legalMoves.find((move) => move?.name === square.name)) {
      throw (new IllegalMoveError(`${this.pos.name} to ${square.name}`));
    }

    const takenPiece = this.take(this.engine.board[square.x][square.y]);

    this.engine.board[this.pos.x][this.pos.y] = null;
    this.engine.board[square.x][square.y] = this;
    this.pos = square;

    return takenPiece;
  }

  take(piece) {
    if (!(piece instanceof ChessPiece)) {
      return null;
    }
    if (piece.color === this.color) {
      throw (new IllegalMoveError(`${this.pos.name} to ${piece.pos.name}`));
    }

    const index = this.engine.pieces[piece.color].indexOf(piece);

    this.engine.pieces[piece.color].splice(index, 1);
    this.engine.board[piece.pos.x][piece.pos.y] = null;
    this.engine.taken[piece.color] = piece;

    piece.dom.remove();

    return piece;
  }

  checkBreakerMoves() {
    this.checkBreakers = [this.pos];
  }

  breakChecks() {
    if (!this.engine.kings[this.color].isCheck()) return;

    this.legalMoves = this.legalMoves.filter(move => {
      for (const attacker of this.engine.checks[this.color]) {
        for (const interception of attacker.checkBreakers) {
          if (move.name === interception.name) {
            return true;
          }
        }
      }
      return false;
    });

    return false;
  }

  /**
   * utility method
   * if move is legal, will push to this.legalMoves 
   * @param {0} x : column in the chess board
   * @param {1} y : row in the chess board
   * @returns
   *     - true if movement should continue
   *     - false if movement should stop
   */
  legalBoardSpace(x, y) {
    const space = new Square(x, y);

    if (!this.engine.inBounds(space)) {
      return false;
    }
    this.targets.push(space);
    const target = this.engine.getSquare(space);

    if (target instanceof ChessPiece && target.color === this.color) {
      return false;
    }

    this.legalMoves.push(space);

    if (target instanceof ChessPiece && target.type !== KING) {
      return false;
    }

    return true;
  }

  createDomChessPiece() {
    let chessPieceDom = document.createElement("div");
    chessPieceDom.className = "chess-piece";

    return chessPieceDom;
  }
}

export default ChessPiece;