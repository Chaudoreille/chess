import ChessPiece from "./ChessPiece.js";
import Square from "../Square.js";
import { PAWN } from "../constants.js";

class Pawn extends ChessPiece {
  constructor(gameEngine, color, square) {
    super(gameEngine, color, square);
    this.type = PAWN;
    this.dom.classList.add(`${this.color}-${this.type}`);
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
    const pawnTargets = [];
    const left = new Square(this.pos.x - 1, this.pos.y);
    const right = new Square(this.pos.x + 1, this.pos.y);
    const leftDiagonal = new Square(this.pos.x - 1, this.pos.y + this.direction);
    const rightDiagonal = new Square(this.pos.x + 1, this.pos.y + this.direction);

    super.update();
    this.updateForwardPath();

    if (this.engine.inBounds(left) && this.engine.getSquare(left) instanceof Pawn &&
      this.engine.getSquare(left).color !== this.color &&
      this.engine.getSquare(left).enPassant
    ) {
      this.legalBoardSpace(left.x, left.y + this.direction);
      pawnTargets.push(left);
    }

    if (this.engine.inBounds(right) && this.engine.getSquare(right) instanceof Pawn &&
      this.engine.getSquare(right).color !== this.color &&
      this.engine.getSquare(right).enPassant
    ) {
      this.legalBoardSpace(right.x, right.y + this.direction);
      pawnTargets.push(right);
    }

    if (this.engine.inBounds(leftDiagonal) && this.engine.getSquare(leftDiagonal) instanceof ChessPiece) {
      this.legalBoardSpace(leftDiagonal.x, leftDiagonal.y);
      pawnTargets.push(leftDiagonal);
    }
    if (this.engine.inBounds(rightDiagonal) && this.engine.getSquare(rightDiagonal) instanceof ChessPiece) {
      this.legalBoardSpace(rightDiagonal.x, rightDiagonal.y);
      pawnTargets.push(rightDiagonal);
    }
    this.targets = pawnTargets;
  }

  updateForwardPath() {
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
}

export default Pawn;