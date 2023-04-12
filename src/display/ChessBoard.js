import * as utils from "../utilities.js";
import { newGame } from "../index.js";
import { IllegalMoveError } from "../engine/error.js";
import { WHITE, BLACK, KING } from "../engine/constants.js";
import ChessEngine from "../engine/ChessEngine.js";
import ChessPiece from "../engine/chess-pieces/ChessPiece.js";
import Square from "../engine/Square.js";

class ChessBoard {
  constructor() {
    this.engine = new ChessEngine();
    this._selectedPiece = false;
    this._prisons = {};

    this._board = document.getElementById("chess-board");
    this._createBoard();

    this._cells = [...this._board.querySelectorAll(".square")].reduce((obj, element) => {
      obj[element.id] = element;
      return obj;
    }, {});
  }

  // TODO: create chess pieces in index and link them to the engine after creation.
  // cleaner than forcing an object template mimicking an actual chess piece.
  /**
   * fills the board with given piece list
   * @param {Array} pieces 
   */
  populate(pieces) {
    pieces.forEach(piece => {
      const chessPieceDom = document.createElement("div");
      chessPieceDom.className = `chess-piece ${piece.color}-${piece.type}`;
      this._getCell(piece.position).appendChild(chessPieceDom);

      this.engine.addPiece(
        piece.type,
        piece.color,
        piece.position
      );
    });

    this._createPrison(WHITE);
    this._createPrison(BLACK);
    this.engine.update();
  }

  /**
   * returns a list of all cell Nodes
   * @returns {Array<Node>}
   */
  _getCellList() {
    return Object.values(this._cells);
  }

  /**
   * returns the cell Node for a given board position
   * @param {Square} position 
   * @returns {Node}
   */
  _getCell(position) {
    return this._cells[position.name];
  }

  /**
   * returns the ChessPiece Node for a given board position
   * @param {Square} position 
   * @returns {Node}
   */
  _getChessPiece(position) {
    return this._getCell(position).querySelector('.chess-piece');
  }

  /**
   * handles onClick events on board cells
   * @param {Event} event 
   * @returns 
   */
  _clickHandler = event => {
    const cell = event.currentTarget;
    const clickedSquare = Square.fromName(cell.id);
    const currentPiece = this.engine.getSquare(clickedSquare);

    if (this._selectedPiece === currentPiece) {
      this._unSelect();
      return;
    }

    if (currentPiece?.color === this.engine.turn) {
      this._select(currentPiece);
      return;
    }

    if (!this._selectedPiece) {
      return;
    }

    this._moveSelectedPiece(clickedSquare);

    this.engine.getKings().forEach((king) => {
      const kingCell = this._getCell(king.pos);

      if (king.isCheck()) {
        this._highlight(kingCell, "check");
      } else {
        this._clearHighlight(kingCell, "check");
      }
    });

    if (this.engine.winner) {
      utils.modal("Checkmate", `${this.engine.winner} wins !`, "New Game", newGame, "OK");
    }
  };

  /**
   * moves a piece from cell to cell on the board
   * 
   * if a piece is taken, sends it to prison
   * @param {Square} destination 
   * @returns 
   */
  _moveSelectedPiece(destination) {
    const saveSelected = this._selectedPiece;

    if (!this._selectedPiece) {
      return;
    }

    this._unSelect();

    try {
      const destinationCell = this._getCell(destination);
      const selectedPieceNode = this._getChessPiece(saveSelected.pos);

      const takenPiece = this.engine.movePiece(saveSelected, destination);

      if (takenPiece) {
        console.log(takenPiece);
        const takenPieceNode = this._getChessPiece(takenPiece.pos);
        this._prisons[takenPiece.color].querySelector(".square:empty").appendChild(takenPieceNode);
      }
      destinationCell.append(selectedPieceNode);

    } catch (error) {
      if (error instanceof IllegalMoveError) {
        return;
      } else {
        this._select(saveSelected);
        console.error(error);
        return;
      }
    }
  }

  /**
   * selects given piece
   * - calls this._unselect()
   * - highlights selected piece's cell and legal moves
   * @param {ChessPiece} piece 
   */
  _select(piece) {
    if (!piece) {
      return;
    }
    const cell = this._getCell(piece.pos);

    this._unSelect();

    this._selectedPiece = piece;
    this._highlight(cell, "selection");
    piece.legalMoves.forEach(square => {
      this._highlight(this._getCell(square), "legal-move");
    });

    if (piece.type === KING) {
      this._clearHighlight(cell, "check");
    }
  }

  /**
   * unselects currrently selected piece
   * - clears displayed highlights of selected piece
   */
  _unSelect() {
    if (!this._selectedPiece) {
      return;
    }

    this._clearHighlight(this._getCell(this._selectedPiece.pos), "selection");
    this._selectedPiece.legalMoves.forEach(square => {
      this._clearHighlight(this._getCell(square), "legal-move");
    });
    this._selectedPiece = null;
  }

  /**
   * highlights board cell.
   * 
   * available highlights:
   * - "selection"
   * - "legal-move"
   * - "check"
   * @param {Node} cell
   * @param {string} type
   */
  _highlight(cell, type) {
    cell.classList.add(type);
  }

  /**
   * removes highlight from board cell.
   * 
   * available highlight types:
   * - "selection"
   * - "legal-move"
   * - "check"
   * @param {Node} cell
   * @param {string} type
   */
  _clearHighlight(cell, type) {
    cell.classList.remove(type);
  }

  /**
   * creates a cell Node for every square of the board
   */
  _createBoard() {
    this._board.innerHTML = "";
    const grid = [];

    for (let i = 0; i < 8; i++) {
      const column = [];

      for (let j = 0; j < 8; j++) {
        const cell = document.createElement("div");
        const evenRow = i % 2;
        const cellColor = (j % 2 === evenRow) ? "light" : "dark";
        cell.className = `square ${cellColor}`;
        cell.id = Square.name(j, i);
        cell.addEventListener("click", this._clickHandler);
        column.push(cell);
      }
      grid.unshift(column);
    }
    grid.forEach(row => {
      row.forEach(cell => {
        this._board.appendChild(cell);
      });
    });
  }

  /**
   * creates the prison Node for given color.
   * 
   * the prison will hold the taken pieces for given color
   * @param {string} color - see /src/engine/constants.js for more info
   */
  _createPrison(color) {
    const piecesCardinal = this.engine.pieces[color].length - 1;
    this._prisons[color] = document.querySelector(`#${color}-prison .taken`);

    this._prisons[color].innerHTML = "";

    for (let i = 0; i < piecesCardinal; i++) {
      const cell = document.createElement("div");
      cell.className = "square";
      this._prisons[color].appendChild(cell);
    }
  }
}
export default ChessBoard;
