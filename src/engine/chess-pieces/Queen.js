import Square from "../Square.js";
import ChessPiece from "./ChessPiece.js";
import { QUEEN } from "../constants.js";
import { oppositeColor, cmpPositions } from "../../utilities.js";

class Queen extends ChessPiece {
  constructor(gameEngine, color, square) {
    super(gameEngine, color, square);
    this.type = QUEEN;
  }

  update() {
    super.update();
    this.updateLeft();
    this.updateRight();
    this.updateDown();
    this.updateUp();
    this.updateTopLeft();
    this.updateTopRight();
    this.updateBottomLeft();
    this.updateBottomRight();
  }

  checkBreakerMoves() {
    super.checkBreakerMoves();
    const king = this.engine.kings[oppositeColor(this.color)];
    const positions = [king.pos, this.pos];
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
    const xIncrement = king.pos.x - this.pos.x !== 0 ? (king.pos.x - this.pos.x) / Math.abs(king.pos.x - this.pos.x) : 0;
    const yIncrement = king.pos.y - this.pos.y !== 0 ? (king.pos.y - this.pos.y) / Math.abs(king.pos.y - this.pos.y) : 0;
    let x = this.pos.x + xIncrement;
    let y = this.pos.y + yIncrement;

    while (x !== king.pos.x && y !== king.pos.y) {
      this.checkBreakers.push(new Square(x, y));
      x += xIncrement;
      y += yIncrement;
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

  updateTopLeft() {
    let x = this.pos.x - 1;
    let y = this.pos.y + 1;

    while (this.legalBoardSpace(x, y)) {
      x--;
      y++;
    }
    return;
  }

  updateTopRight() {
    let x = this.pos.x + 1;
    let y = this.pos.y + 1;

    while (this.legalBoardSpace(x, y)) {
      x++;
      y++;
    }
  }

  updateBottomLeft() {
    let x = this.pos.x - 1;
    let y = this.pos.y - 1;

    while (this.legalBoardSpace(x, y)) {
      x--;
      y--;
    }
  }

  updateBottomRight() {
    let x = this.pos.x + 1;
    let y = this.pos.y - 1;

    while (this.legalBoardSpace(x, y)) {
      x++;
      y--;
    }
  }
}
export default Queen;