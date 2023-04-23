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
    this.selectedPiece = false;
    this.prisons = {};

    this.board = document.getElementById("chess-board");
    this.createBoard();

    this.cells = [...this.board.querySelectorAll(".square")].reduce((obj, element) => {
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
      this.getCell(piece.position).appendChild(chessPieceDom);

      this.engine.addPiece(
        piece.type,
        piece.color,
        piece.position
      );
    });

    this.createPrison(WHITE);
    this.createPrison(BLACK);
    this.engine.update();
  }

  /**
   * returns a list of all cell Nodes
   * @returns {Array<Node>}
   */
  getCellList() {
    return Object.values(this.cells);
  }

  /**
   * returns the cell Node for a given board position
   * @param {Square} position 
   * @returns {Node}
   */
  getCell(position) {
    return this.cells[position.name];
  }

  /**
   * returns the ChessPiece Node for a given board position
   * @param {Square} position 
   * @returns {Node}
   */
  getChessPiece(position) {
    return this.getCell(position).querySelector('.chess-piece');
  }

  /**
   * handles onClick events on board cells
   * @param {Event} event 
   * @returns 
   */
  clickHandler = event => {
    const cell = event.currentTarget;
    const clickedSquare = Square.fromName(cell.id);
    const currentPiece = this.engine.getSquare(clickedSquare);

    if (this.selectedPiece === currentPiece) {
      this.unSelect();
      return;
    }

    if (currentPiece?.color === this.engine.turn) {
      this.select(currentPiece);
      return;
    }

    if (!this.selectedPiece) {
      return;
    }

    this.moveSelectedPiece(clickedSquare);

    this.engine.getKings().forEach((king) => {
      const kingCell = this.getCell(king.pos);

      if (this.engine.isKingChecked(king.color)) {
        this.highlight(kingCell, "check");
      } else {
        this.clearHighlight(kingCell, "check");
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
  moveSelectedPiece(destination) {
    const saveSelected = this.selectedPiece;

    if (!this.selectedPiece) {
      return;
    }

    this.unSelect();

    try {
      const destinationCell = this.getCell(destination);
      const selectedPieceNode = this.getChessPiece(saveSelected.pos);

      const takenPiece = this.engine.movePiece(saveSelected, destination);

      if (takenPiece) {
        const takenPieceNode = this.getChessPiece(takenPiece.pos);
        this.prisons[takenPiece.color].querySelector(".square:empty").appendChild(takenPieceNode);
      }
      destinationCell.append(selectedPieceNode);

    } catch (error) {
      if (error instanceof IllegalMoveError) {
        return;
      } else {
        this.select(saveSelected);
        console.error(error);
        return;
      }
    }
  }

  /**
   * selects given piece
   * - calls this.unselect()
   * - highlights selected piece's cell and legal moves
   * @param {ChessPiece} piece 
   */
  select(piece) {
    if (!piece) {
      return;
    }
    const cell = this.getCell(piece.pos);

    this.unSelect();

    this.selectedPiece = piece;
    this.highlight(cell, "selection");
    piece.legalMoves.forEach(square => {
      this.highlight(this.getCell(square), "legal-move");
    });

    if (piece.type === KING) {
      this.clearHighlight(cell, "check");
    }
  }

  /**
   * unselects currrently selected piece
   * - clears displayed highlights of selected piece
   */
  unSelect() {
    if (!this.selectedPiece) {
      return;
    }

    this.clearHighlight(this.getCell(this.selectedPiece.pos), "selection");
    this.selectedPiece.legalMoves.forEach(square => {
      this.clearHighlight(this.getCell(square), "legal-move");
    });
    this.selectedPiece = null;
  }

  /**
   * highlights board cell by adding type in the Node's class list.
   * 
   * available highlights:
   * - "selection"
   * - "legal-move"
   * - "check"
   * @param {Node} cell
   * @param {string} type
   */
  highlight(cell, type) {
    cell.classList.add(type);
  }

  /**
   * removes highlight from board cell by removing type from the Node's class list..
   * 
   * available highlight types:
   * - "selection"
   * - "legal-move"
   * - "check"
   * @param {Node} cell
   * @param {string} type
   */
  clearHighlight(cell, type) {
    cell.classList.remove(type);
  }

  /**
   * creates a cell Node for every square of the board
   */
  createBoard() {
    this.board.innerHTML = "";
    const grid = [];

    for (let i = 0; i < 8; i++) {
      const column = [];

      for (let j = 0; j < 8; j++) {
        const cell = document.createElement("div");
        const evenRow = i % 2;
        const cellColor = (j % 2 === evenRow) ? "light" : "dark";
        cell.className = `square ${cellColor}`;
        cell.id = Square.name(j, i);
        cell.addEventListener("click", this.clickHandler);
        column.push(cell);
      }
      grid.unshift(column);
    }
    grid.forEach(row => {
      row.forEach(cell => {
        this.board.appendChild(cell);
      });
    });
  }

  /**
   * creates the prison Node for given color.
   * 
   * the prison will hold the taken pieces for given color
   * @param {string} color - see /src/engine/constants.js for more info
   */
  createPrison(color) {
    const piecesCardinal = this.engine.pieces[color].length - 1;
    this.prisons[color] = document.querySelector(`#${color}-prison .taken`);

    this.prisons[color].innerHTML = "";

    for (let i = 0; i < piecesCardinal; i++) {
      const cell = document.createElement("div");
      cell.className = "square";
      this.prisons[color].appendChild(cell);
    }
  }
}
export default ChessBoard;
