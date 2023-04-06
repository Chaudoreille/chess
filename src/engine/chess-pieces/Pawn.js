import ChessPiece from "./ChessPiece.js";
import Square from "../Square.js";
import { PAWN } from "../constants.js";
import { inBounds } from "../../utilities.js";

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
    super.update();
    let blocked = false;
    let { x, y } = this.pos;

    if (inBounds(x - 1, y) && this.engine.board[x - 1][y] instanceof Pawn &&
      this.engine.board[x - 1][y].color !== this.color &&
      this.engine.board[x - 1][y].enPassant) {
      this.legalBoardSpace(x - 1, y + this.direction);
    }

    if (inBounds(x + 1, y) && this.engine.board[x + 1][y] instanceof Pawn &&
      this.engine.board[x + 1][y].color !== this.color &&
      this.engine.board[x + 1][y].enPassant) {
      this.legalBoardSpace(x + 1, y + this.direction);
    }

    if (inBounds(x - 1, y + this.direction) && this.engine.board[x - 1][y + this.direction] instanceof ChessPiece) {
      this.legalBoardSpace(x - 1, y + this.direction);
    }
    if (inBounds(x, y + this.direction)) {
      if (!this.engine.board[x][y + this.direction]) {
        this.legalBoardSpace(x, y + this.direction);
      } else {
        blocked = true;
      }
    }
    if (inBounds(x + 1, y + this.direction) && this.engine.board[x + 1][y + this.direction] instanceof ChessPiece) {
      this.legalBoardSpace(x + 1, y + this.direction);
    }

    if (!this.starterPawn) {
      console.log(`${this.pos.name} non-starter`);
    }
    if (this.starterPawn && !blocked) {
      if (inBounds(x, y + 2 * this.direction) && !(this.engine.board[x][y + 2 * this.direction] instanceof ChessPiece)) {
        this.legalBoardSpace(x, y + 2 * this.direction);
      }
    }

    this.targets = [];
    if (inBounds(this.pos.x - 1, this.pos.y + this.direction)) {
      this.targets.push(new Square(this.pos.x - 1, this.pos.y + this.direction));
    }
    if (inBounds(this.pos.x + 1, this.pos.y + this.direction)) {
      this.targets.push(new Square(this.pos.x + 1, this.pos.y + this.direction));
    }
  }
}

export default Pawn;