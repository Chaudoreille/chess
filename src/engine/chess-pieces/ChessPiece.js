import Square from "../Square.js";
import { IllegalMoveError } from "../error.js";
import { inBounds, oppositeColor } from "../../utilities.js";
import { KING, PAWN } from "../constants.js";

class ChessPiece {
  constructor(chessBoard, color, square) {
    this.board = chessBoard;

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
    const takenPiece = this.take(this.board.collisions[square.x][square.y]);

    this.board.collisions[this.pos.x][this.pos.y] = null;
    this.board.collisions[square.x][square.y] = this;
    this.pos = square;

    this.board.pieces[oppositeColor(this.color)].forEach(element => {
      if (element.type === PAWN) {
        element.enPassant = false;
      }
    });

    return takenPiece;
  }

  take(piece) {
    if (!(piece instanceof ChessPiece)) {
      return null;
    }
    if (piece.color === this.color) {
      throw (new IllegalMoveError(`${this.pos.name} to ${piece.pos.name}`));
    }

    const index = this.board.pieces[piece.color].indexOf(piece);

    this.board.pieces[piece.color].splice(index, 1);
    this.board.collisions[piece.pos.x][piece.pos.y] = null;
    this.board.taken[piece.color] = piece;

    piece.dom.remove();

    return piece;
  }

  checkBreakerMoves() {
    this.checkBreakers = [this.pos];
  }

  breakChecks() {
    if (!this.board.kings[this.color].isCheck()) return;

    this.legalMoves = this.legalMoves.filter(move => {
      for (const attacker of this.board.checks[this.color]) {
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
    if (!inBounds(x, y)) {
      return false;
    }
    this.targets.push(new Square(x, y));
    const target = this.board.collisions[x][y];

    if (target instanceof ChessPiece && target.color === this.color) {
      return false;
    }

    this.legalMoves.push(new Square(x, y));

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