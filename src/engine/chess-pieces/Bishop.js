import ChessPiece from "./ChessPiece.js";
import Square from "../Square.js";
import { BISHOP } from "../constants.js";
import { oppositeColor } from "../../utilities.js";

class Bishop extends ChessPiece {
  constructor(gameEngine, color, square) {
    super(gameEngine, color, square);
    this.type = BISHOP;
  }

  update() {
    super.update();
    this.updateTopLeft();
    this.updateTopRight();
    this.updateBottomLeft();
    this.updateBottomRight();
  }

  updateCheckBreakers() {
    super.updateCheckBreakers();
    if (this.checkBreakers.length === 0) return;

    const king = this.game.kings[oppositeColor(this.color)];
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
export default Bishop;