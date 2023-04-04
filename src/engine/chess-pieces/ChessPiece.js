import Square from "../Square.js";
import { inBounds, oppositeColor, modal } from "../../utilities.js";
import { KING, PAWN } from "../constants.js";
import { newGame } from "../../index.js";

class ChessPiece {
  constructor(chessBoard, color, square) {
    this.board = chessBoard;

    this.color = color;
    this.type = null;
    this.pos = square;

    this.legalMoves = [];
    this.targets = [];
    this.checkBreakers = [];

    this.dom = this.createDomChessPiece();
  }

  update() {
    this.legalMoves = [];
    this.targets = [];
  }

  /**
   * moves chess piece on the board
   * @throws
   *      - Illegal Move
   *      - Friendly Fire
   * @param {0} square
   * @returns
   *      - the taken piece if a piece was taken
   *      - false otherwise
   */
  move(square) {
    if (!this.legalMoves.find((move) => move.name === square.name)) {
      throw (new Error("Illegal Move"));
    }
    const takenPiece = this.board.collisions[square.x][square.y];
    if (takenPiece) {
      if (takenPiece.color === this.color) {
        throw (new Error("Friendly Fire"));
      } else if (takenPiece) {
        takenPiece.remove();
      }
    }

    this.board.collisions[this.pos.x][this.pos.y] = null;
    this.board.collisions[square.x][square.y] = this;
    this.pos = square;

    this.board.pieces[oppositeColor(this.color)].forEach(element => {
      if (element.type == PAWN) {
        element.enPassant = false;
      }
    });

    this.board.update();
    this.board.updateChecks();

    for (let color in this.board.pieces) {
      if (this.board.pieces[color].every(p => p.legalMoves.length === 0)) {
        modal("Checkmate", `${oppositeColor(color)} wins !`, "New Game", newGame, "OK");
      }
    }
    /**
     * temporary measure : discovered check is checkMate
     */
    if (this.board.kings[this.color].isCheck()) {
      modal("CheckMate", `${oppositeColor(this.color)} wins !`, false, "New Game", newGame, "OK");
    }
    this.board.turn = oppositeColor(this.color);

    if (takenPiece) {
      document.querySelector(`#${takenPiece.color}-prison .square:empty`).appendChild(takenPiece.dom);
      return takenPiece;
    } else {
      return false;
    }
  }

  checkBreakerMoves() {
    this.checkBreakers = [this.pos];
  }

  breakChecks() {
    if (!this.board.kings[this.color].isCheck()) return;

    this.legalMoves = this.legalMoves.filter(move => {
      for (const attacker of this.board.checks[this.color]) {
        for (const interception of attacker.checkBreakers) {
          if (move.name === interception.name) {
            return true;
          }
        }
      }
      return false;
    });

    return false;
  }

  /**
   * utility method
   * if move is legal, will push to this.legalMoves
   * @param {0} x : column in the chess board
   * @param {1} y : row in the chess board
   * @returns
   *     - true if movement should continue
   *     - false if movement should stop
   */
  legalBoardSpace(x, y) {
    if (!inBounds(x, y)) {
      return false;
    }
    this.targets.push(new Square(x, y));
    const target = this.board.collisions[x][y];

    if (target instanceof ChessPiece &&
      (target.type !== KING || target.color === this.color)) {
      if (target.color !== this.color) {
        this.legalMoves.push(new Square(x, y));
      }
      return false;
    }
    this.legalMoves.push(new Square(x, y));
    return true;
  }

  createDomChessPiece() {
    let chessPieceDom = document.createElement("div");
    chessPieceDom.className = "chess-piece";

    return chessPieceDom;
  }

  remove() {
    const pieceList = this.board.pieces[this.color];
    for (let i = 0; i < pieceList.length; i++) {
      if (pieceList[i] === this) {
        pieceList.splice(i, 1);
      }
    }
    this.board.collisions[this.pos.x][this.pos.y] = null;
    this.board.taken[this.color] = this;
    this.dom.remove();
  }
}
export default ChessPiece;