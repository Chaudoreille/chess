import ChessPiece from "./ChessPiece.js";
import Square from "../Square.js";
import { PAWN } from "../constants.js";

class Pawn extends ChessPiece {
  constructor(color, square, gameEngine = null) {
    super(color, square, gameEngine);
    this.type = PAWN;
    this.starterPawn = true;
    this.enPassant = false;
    this.direction;
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
    const behind = this.getGame().board[this.pos.x][this.pos.y - this.direction];
    if (behind instanceof Pawn) {
      this.take(behind);
      return behind;
    }

    return null;
  }

  setGame(gameEngine) {
    super.setGame(gameEngine);
    this.direction = gameEngine.directions[this.color];
  }

  update() {
    const left = new Square(this.pos.x - 1, this.pos.y);
    const right = new Square(this.pos.x + 1, this.pos.y);
    const leftDiagonal = new Square(this.pos.x - 1, this.pos.y + this.direction);
    const rightDiagonal = new Square(this.pos.x + 1, this.pos.y + this.direction);

    super.update();

    if (this.getGame().turn !== this.color) {
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
    const game = this.getGame();
    const first = new Square(this.pos.x, this.pos.y + this.direction);
    const second = new Square(this.pos.x, this.pos.y + this.direction * 2);

    if (!game.inBounds(first) || game.getSquare(first) instanceof ChessPiece) {
      return;
    }
    this.legalBoardSpace(first.x, first.y);

    if (!this.starterPawn || !game.inBounds(second) || game.getSquare(second) instanceof ChessPiece) {
      return;
    }
    this.legalBoardSpace(second.x, second.y);
  }

  updateEnPassant(square) {
    const game = this.getGame();
    if (game.inBounds(square) && game.getSquare(square) instanceof Pawn &&
      game.getSquare(square).color !== this.color &&
      game.getSquare(square).enPassant
    ) {
      this.legalBoardSpace(square.x, square.y + this.direction);
      return square;
    }
    return null;
  }

  updateDiagonal(square) {
    const game = this.getGame();
    if (game.inBounds(square) && game.getSquare(square) instanceof ChessPiece) {
      this.legalBoardSpace(square.x, square.y);
    }
    return square;
  }
}

export default Pawn;