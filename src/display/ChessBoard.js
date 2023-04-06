import * as utils from "../utilities.js";
import { newGame } from "../index.js";
import { IllegalMoveError } from "../engine/error.js";
import { WHITE, BLACK, KING } from "../engine/constants.js";
import ChessEngine from "../engine/ChessEngine.js";
import Square from "../engine/Square.js";

class ChessBoard {
  constructor() {
    this.engine = new ChessEngine();
    this._selectedPiece = false;
    this._board = document.getElementById("chess-board");
    this._board.innerHTML = "";
    this._prison = {
      [WHITE]: document.querySelector("#white-prison .taken"),
      [BLACK]: document.querySelector("#black-prison .taken"),
    };
    this._createDomGrid();
    this._cells = [...this._board.querySelectorAll(".square")].reduce((obj, element) => {
      obj[element.id] = element;
      return obj;
    }, {});
    this._prison[WHITE].innerHTML = "";
    this._prison[BLACK].innerHTML = "";
  }

  getCellList() {
    return Object.values(this._cells);
  }

  getCell(square) {
    return this._cells[square.name];
  }

  _click = event => {
    const cell = event.currentTarget;

    if (!this._selectedPiece) {
      const currentPiece = this.engine.pieceAt(cell.id);

      if (currentPiece && currentPiece.color === this.engine.turn) {
        this._selectedPiece = currentPiece;
        if (this._selectedPiece.type === KING) {
          utils.hideCheck(this._selectedPiece);
        }
        utils.highlight(cell);
        utils.showLegalMoves(currentPiece.legalMoves);
      }
      return;
    }

    this.getCellList().forEach((singleCell) => utils.normalize(singleCell));

    try {
      const takenPiece = this.engine.movePiece(this._selectedPiece, Square.fromName(cell.id));

      if (takenPiece) {
        this._prison[takenPiece.color].querySelector(".square:empty").appendChild(takenPiece.dom);
      }

      cell.append(this._selectedPiece.dom);
      this._selectedPiece = false;
    } catch (error) {
      if (error instanceof IllegalMoveError) {
        this._selectedPiece = false;
      } else {
        console.error(error);
      }
    }

    this.engine.getKings().forEach((king) => {
      if (king.isCheck()) {
        utils.showCheck(king);
      } else {
        utils.hideCheck(king);
      }
    });

    if (this.engine.winner) {
      utils.modal("Checkmate", `${this.engine.winner} wins !`, "New Game", newGame, "OK");
    }
  };

  addEvents() {
    this.getCellList().forEach((cell) => {
      cell.addEventListener("click", this._click);
    });
    return this;
  }

  _createDomGrid() {
    const grid = [];

    for (let i = 0; i < 8; i++) {
      const column = [];

      for (let j = 0; j < 8; j++) {
        const square = document.createElement("div");
        const evenRow = i % 2;
        const squareColor = (j % 2 === evenRow) ? "light" : "dark";
        square.className = `square ${squareColor}`;
        square.id = Square.name(j, i);
        column.push(square);
      }
      grid.unshift(column);
    }
    grid.forEach(row => {
      row.forEach(cell => {
        this._board.appendChild(cell);
      });
    });
  }

  render() {
    this.engine.update();
    this.engine.collisions.forEach(row => {
      row.forEach(piece => {
        if (piece) {
          this._cells[piece.pos.name].appendChild(piece.dom);
        }
      });
    });
  }

  _buildPrison(color) {
    const piecesCardinal = this.engine.pieces[color].length - 1;

    for (let i = 0; i < piecesCardinal; i++) {
      const cell = document.createElement("div");
      cell.className = "square";
      this._prison[color].appendChild(cell);
    }
  }

  populate(pieces) {
    pieces.forEach(piece => this.engine.addPiece(
      piece.type,
      piece.color,
      piece.position
    ));

    this._buildPrison(WHITE);
    this._buildPrison(BLACK);
  }
}
export default ChessBoard;
