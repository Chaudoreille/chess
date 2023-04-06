import ChessPiece from "./ChessPiece.js";
import { KNIGHT } from "../constants.js";

class Knight extends ChessPiece {
  constructor(gameEngine, color, square) {
    super(gameEngine, color, square);
    this.type = KNIGHT;
    this.dom.classList.add(`${this.color}-${this.type}`);
  }

  update() {
    super.update();
    this.legalBoardSpace(this.pos.x - 2, this.pos.y - 1);
    this.legalBoardSpace(this.pos.x - 2, this.pos.y + 1);
    this.legalBoardSpace(this.pos.x - 1, this.pos.y - 2);
    this.legalBoardSpace(this.pos.x - 1, this.pos.y + 2);
    this.legalBoardSpace(this.pos.x + 1, this.pos.y - 2);
    this.legalBoardSpace(this.pos.x + 1, this.pos.y + 2);
    this.legalBoardSpace(this.pos.x + 2, this.pos.y - 1);
    this.legalBoardSpace(this.pos.x + 2, this.pos.y + 1);
  }
}
export default Knight;