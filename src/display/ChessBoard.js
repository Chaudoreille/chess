import * as utils from "../utilities.js";
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
    const position = Square.fromName(cell.id);
    const currentPiece = this.collisions[position.x][position.y];

    if (this._selectedPiece && (!currentPiece || currentPiece.color !== this.turn)) {
      try {
        if (this._selectedPiece.type === KING) {
          utils.hideCheck(this._selectedPiece);
        }
        this._selectedPiece.move(position);
      } catch (error) {
        if (error.message === "Illegal Move") {
          this._selectedPiece = false;
          this.getCellList().forEach((singleCell) => utils.normalize(singleCell));
          return;
        }
      }
      cell.append(this._selectedPiece.dom);
      this._selectedPiece = false;
      this.getCellList().forEach((singleCell) => utils.normalize(singleCell));

      Object.values(this.kings).forEach((king) => {
        if (king.isCheck()) {
          utils.showCheck(king);
        } else {
          utils.hideCheck(king);
        }
      });
    } else if (currentPiece && currentPiece.color === this.turn) {
      if (currentPiece === this._selectedPiece) {
        this.getCellList().forEach((singleCell) => utils.normalize(singleCell));
        this._selectedPiece = null;
        return;
      }
      this.getCellList().forEach((singleCell) => utils.normalize(singleCell));

      utils.highlight(cell);
      utils.showLegalMoves(currentPiece.legalMoves);
      this._selectedPiece = currentPiece;
    }
  };

  addEvents() {
    this.getCellList().forEach((cell) => {
      cell.addEventListener("click", this.click);
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
