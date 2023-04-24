import ChessPiece from "./ChessPiece.js";
import { KING } from "../constants.js";
import { oppositeColor } from "../../utilities.js";

class King extends ChessPiece {
  constructor(color, square, gameEngine = null) {
    super(color, square, gameEngine);
    this.type = KING;
  }

  update() {
    super.update();

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        this.legalBoardSpace(this.pos.x + i, this.pos.y + j);
      }
    }
  }

  setGame(gameEngine) {
    super.setGame(gameEngine);
    this.game.kings[this.color] = this;
  }

  updateLegalMovesWhenChecked() {
    this.legalMoves = this.legalMoves.filter(move => {
      for (let enemy of this.game.pieces[oppositeColor(this.color)]) {
        for (let target of enemy.targets) {
          if (target.name === move.name) {
            return false;
          }
        }
      }
      return true;
    });

    return;
  }
}
export default King;