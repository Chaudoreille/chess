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

    // En Passant
    // if there is a pawn behind freshly moved pawn, and no piece was taken, en passant happened 
    const behind = this.game.board[this.pos.x][this.pos.y - this.direction];
    if (behind instanceof Pawn) {
      this.take(behind);
      return behind;
    }

    return null;
  }

  update() {
    const left = new Square(this.pos.x - 1, this.pos.y);
    const right = new Square(this.pos.x + 1, this.pos.y);
    const leftDiagonal = new Square(this.pos.x - 1, this.pos.y + this.direction);
    const rightDiagonal = new Square(this.pos.x + 1, this.pos.y + this.direction);

    super.update();

    if (this.game.turn !== this.color) {
      this.enPassant = false;
    }

    this.updateForwardPath();

    const pawnTargets = [
      this.updateDiagonal(leftDiagonal),
      this.updateDiagonal(rightDiagonal),
      this.updateEnPassant(left),
      this.updateEnPassant(right),
    ];

    this.targets = pawnTargets.filter(square => square !== null);
  }

  updateForwardPath() {
    const first = new Square(this.pos.x, this.pos.y + this.direction);
    const second = new Square(this.pos.x, this.pos.y + this.direction * 2);

    if (!this.game.inBounds(first) || this.game.getSquare(first) instanceof ChessPiece) {
      return;
    }
    this.legalBoardSpace(first.x, first.y);

    if (!this.starterPawn || !this.game.inBounds(second) || this.game.getSquare(second) instanceof ChessPiece) {
      return;
    }
    this.legalBoardSpace(second.x, second.y);
  }

  updateEnPassant(square) {
    if (this.game.inBounds(square) && this.game.getSquare(square) instanceof Pawn &&
      this.game.getSquare(square).color !== this.color &&
      this.game.getSquare(square).enPassant
    ) {
      this.legalBoardSpace(square.x, square.y + this.direction);
      return square;
    }
    return null;
  }

  updateDiagonal(square) {
    if (this.game.inBounds(square) && this.game.getSquare(square) instanceof ChessPiece) {
      this.legalBoardSpace(square.x, square.y);
    }
    return square;
  }
}

export default Pawn;