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
    if (this.starterPawn) {
      this.starterPawn = false;
      this.enPassant = true;
    }
    const takenPiece = super.move(square);

    if (takenPiece) {
      return takenPiece;
    }

    // if there is a pawn behind freshly moved pawn, and no piece was taken, en passant happened 
    const behind = this.engine.collisions[this.pos.x][this.pos.y - this.direction];
    if (behind instanceof Pawn) {
      this.take(behind);
    }
  }

  update() {
    super.update();
    let blocked = false;
    let { x, y } = this.pos;

    if (inBounds(x - 1, y) && this.engine.collisions[x - 1][y] instanceof Pawn &&
      this.engine.collisions[x - 1][y].color !== this.color &&
      this.engine.collisions[x - 1][y].enPassant) {
      this.legalBoardSpace(x - 1, y + this.direction);
    }

    if (inBounds(x + 1, y) && this.engine.collisions[x + 1][y] instanceof Pawn &&
      this.engine.collisions[x + 1][y].color !== this.color &&
      this.engine.collisions[x + 1][y].enPassant) {
      this.legalBoardSpace(x + 1, y + this.direction);
    }

    y += this.direction;

    if (inBounds(x - 1, y) && this.engine.collisions[x - 1][y]) {
      this.legalBoardSpace(x - 1, y);
    }
    if (inBounds(x, y)) {
      if (!this.engine.collisions[x][y]) {
        this.legalBoardSpace(x, y);
      } else {
        blocked = true;
      }
    }
    if (inBounds(x + 1, y) && this.engine.collisions[x + 1][y]) {
      this.legalBoardSpace(x + 1, y);
    }

    if (this.starterPawn && !blocked) {
      y += this.direction;
      if (inBounds(x, y) && !this.engine.collisions[x][y]) {
        this.legalBoardSpace(x, y);
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