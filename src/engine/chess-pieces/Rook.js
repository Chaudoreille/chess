import ChessPiece from "./ChessPiece.js";
import Square from "../Square.js";
import { ROOK } from "../constants.js";
import { cmpPositions, oppositeColor } from "../../utilities.js";

class Rook extends ChessPiece {
  constructor(gameEngine, color, square) {
    super(gameEngine, color, square);
    this.type = ROOK;
  }

  update() {
    super.update();

    this.updateLeft();
    this.updateRight();
    this.updateDown();
    this.updateUp();
  }

  updateCheckBreakers() {
    super.updateCheckBreakers();
    if (this.checkBreakers.length === 0) return;

    let king = this.game.kings[oppositeColor(this.color)];
    let positions = [king.pos, this.pos];
    positions.sort(cmpPositions);

    if (positions[0].x === positions[1].x) {
      for (let i = positions[0].y + 1; i < positions[1].y; i++) {
        this.checkBreakers.push(new Square(positions[0].x, i));
      }
    } else {
      for (let i = positions[0].x + 1; i < positions[1].x; i++) {
        this.checkBreakers.push(new Square(i, positions[0].y));
      }
    }
  }

  updateLeft() {
    for (let i = this.pos.x - 1; i >= 0; i--) {
      if (!this.legalBoardSpace(i, this.pos.y)) {
        return;
      }
    }
    return;
  }

  updateRight() {
    for (let i = this.pos.x + 1; i < 8; i++) {
      if (!this.legalBoardSpace(i, this.pos.y)) {
        return;
      }
    }
    return;
  }

  updateDown() {
    for (let j = this.pos.y - 1; j >= 0; j--) {
      if (!this.legalBoardSpace(this.pos.x, j)) {
        return;
      }
    }
    return;
  }

  updateUp() {
    for (let j = this.pos.y + 1; j < 8; j++) {
      if (!this.legalBoardSpace(this.pos.x, j)) {
        return;
      }
    }
    return;
  }
}
export default Rook;