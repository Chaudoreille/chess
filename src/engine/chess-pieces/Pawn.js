import ChessPiece from "./ChessPiece.js";
import Square from "../Square.js";
import { PAWN } from "../constants.js";
import { inBounds } from "../../utilities.js";

class Pawn extends ChessPiece {
  constructor(chessBoard, color, square) {
    super(chessBoard, color, square);
    this.type = PAWN;
    this.dom.classList.add(`${this.color}-${this.type}`);
    this.direction = chessBoard.directions[color];
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

    // if there is a pawn behind moved pawn, and no piece was taken, en passant happened 
    if (this.board.collisions[this.pos.x][this.pos.y - this.direction] instanceof Pawn) {
      this.take(this.board.collisions[this.pos.x][this.pos.y - this.direction]);
    }
  }

  update() {
    super.update();
    let blocked = false;
    let { x, y } = this.pos;

    if (inBounds(x - 1, y) && this.board.collisions[x - 1][y] instanceof Pawn &&
      this.board.collisions[x - 1][y].color !== this.color &&
      this.board.collisions[x - 1][y].enPassant) {
      this.legalBoardSpace(x - 1, y + this.direction);
    }

    if (inBounds(x + 1, y) && this.board.collisions[x + 1][y] instanceof Pawn &&
      this.board.collisions[x + 1][y].color !== this.color &&
      this.board.collisions[x + 1][y].enPassant) {
      this.legalBoardSpace(x + 1, y + this.direction);
    }

    y += this.direction;

    if (inBounds(x - 1, y) && this.board.collisions[x - 1][y]) {
      this.legalBoardSpace(x - 1, y);
    }
    if (inBounds(x, y)) {
      if (!this.board.collisions[x][y]) {
        this.legalBoardSpace(x, y);
      } else {
        blocked = true;
      }
    }
    if (inBounds(x + 1, y) && this.board.collisions[x + 1][y]) {
      this.legalBoardSpace(x + 1, y);
    }

    if (this.starterPawn && !blocked) {
      y += this.direction;
      if (inBounds(x, y) && !this.board.collisions[x][y]) {
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