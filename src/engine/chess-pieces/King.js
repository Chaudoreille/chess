import ChessPiece from "./ChessPiece.js";
import { KING } from "../constants.js";
import { oppositeColor } from "../../utilities.js";

class King extends ChessPiece {
  constructor(chessBoard, color, square) {
    super(chessBoard, color, square);
    this.type = KING;
    this.dom.classList.add(`${this.color}-${this.type}`);
  }

  spawn() {
    super.spawn();
    this.board.kings[this.color] = this;
  }

  update() {
    super.update();

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        this.legalBoardSpace(this.pos.x + i, this.pos.y + j);
      }
    }
  }

  breakChecks() {
    this.legalMoves = this.legalMoves.filter(move => {
      for (let enemy of this.board.pieces[oppositeColor(this.color)]) {
        for (let target of enemy.targets) {
          if (target.name === move.name) {
            return false;
          }
        }
      }
      return true;
    });
  }

  isCheck() {
    return this.board.checks[this.color].length > 0;
  }

  getChecks() {
    this.board.checks[this.color] = [];

    this.board.pieces[oppositeColor(this.color)].forEach(enemy => {
      for (const target of enemy.targets) {
        if (target.name === this.pos.name) {
          enemy.checkBreakerMoves();
          this.board.checks[this.color].push(enemy);
          return;
        }
      }
    });
  }

  isCheckmate() {
    this.board.pieces[this.color];
    return false;
  }
}
export default King;