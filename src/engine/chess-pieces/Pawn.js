import ChessPiece from "./ChessPiece.js";
import Square from "../Square.js";
import { PAWN } from "../constants.js";

class Pawn extends ChessPiece {
  constructor(gameEngine, color, square) {
    super(gameEngine, color, square);
    this.type = PAWN;
    this.direction = gameEngine.directions[color];
    this.starterPawn = true;
    this.enPassant = false;
  }

  move(square) {
    const takenPiece = super.move(square);

    if (this.starterPawn) {
      this.starterPawn = false;
      this.enPassant = true;
    }

    if (takenPiece) {
      return takenPiece;
    }

    // if there is a pawn behind freshly moved pawn, and no piece was taken, en passant happened 
    const behind = this.engine.board[this.pos.x][this.pos.y - this.direction];
    if (behind instanceof Pawn) {
      this.take(behind);
    }
  }

  update() {
    const left = new Square(this.pos.x - 1, this.pos.y);
    const right = new Square(this.pos.x + 1, this.pos.y);
    const leftDiagonal = new Square(this.pos.x - 1, this.pos.y + this.direction);
    const rightDiagonal = new Square(this.pos.x + 1, this.pos.y + this.direction);

    super.update();

    if (this.engine.turn !== this.color) {
      this.enPassant = false;
    }

    this._updateForwardPath();

    const pawnTargets = [
      this._updateDiagonal(leftDiagonal),
      this._updateDiagonal(rightDiagonal),
      this._updateEnPassant(left),
      this._updateEnPassant(right),
    ];

    this.targets = pawnTargets.filter(square => square !== null);
  }

  _updateForwardPath() {
    const first = new Square(this.pos.x, this.pos.y + this.direction);
    const second = new Square(this.pos.x, this.pos.y + this.direction * 2);

    if (!this.engine.inBounds(first) || this.engine.getSquare(first) instanceof ChessPiece) {
      return;
    }
    this.legalBoardSpace(first.x, first.y);

    if (!this.starterPawn || !this.engine.inBounds(second) || this.engine.getSquare(second) instanceof ChessPiece) {
      return;
    }
    this.legalBoardSpace(second.x, second.y);
  }

  _updateEnPassant(square) {
    if (this.engine.inBounds(square) && this.engine.getSquare(square) instanceof Pawn &&
      this.engine.getSquare(square).color !== this.color &&
      this.engine.getSquare(square).enPassant
    ) {
      this.legalBoardSpace(square.x, square.y + this.direction);
      return square;
    }
    return null;
  }

  _updateDiagonal(square) {
    if (this.engine.inBounds(square) && this.engine.getSquare(square) instanceof ChessPiece) {
      this.legalBoardSpace(square.x, square.y);
    }
    return square;
  }
}

export default Pawn;