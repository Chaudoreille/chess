import { BLACK, WHITE, ROOK, BISHOP, KNIGHT, QUEEN, KING, PAWN, A_CHAR_CODE } from "./engine/constants.js";
import King from "./engine/chess-pieces/King.js";
import Queen from "./engine/chess-pieces/Queen.js";
import Rook from "./engine/chess-pieces/Rook.js";
import Knight from "./engine/chess-pieces/Knight.js";
import Bishop from "./engine/chess-pieces/Bishop.js";
import Pawn from "./engine/chess-pieces/Pawn.js";
import Square from "./engine/Square.js";

export function cmpPositions(a, b) {
  if (a.x === b.x) {
    return a.y - b.y;
  }
  return a.x - b.x;
}

/**
 * ## checks if a x,y position is within board bounds
 * @param {Number} x 
 * @param {Number} y 
 * @returns 
 */
export function inBounds(x, y) {
  if (x < 0 || x > 7 ||
    y < 0 || y > 7) {
    return false;
  }
  return true;
}

export function pushIfInBounds(container, position) {
  if (inBounds(position.x, position.y)) {
    container.push(position);
  }
}

export function chessPieceFactory(chessBoard, type, color, position, ...rest) {
  const classes = {
    [KING]: King,
    [QUEEN]: Queen,
    [BISHOP]: Bishop,
    [KNIGHT]: Knight,
    [ROOK]: Rook,
    [PAWN]: Pawn,
  };
  const square = createSquareFromName(position);
  return new classes[type](chessBoard, color, square, rest);
}

export function createSquareFromName(name) {
  const x = name.charCodeAt(0) - A_CHAR_CODE;
  const y = +name[1] - 1;

  return new Square(x, y);
}

export function getSquareName(x, y) {
  return `${String.fromCharCode(A_CHAR_CODE + x)}${y + 1}`;
}

/**
 * returns a null-filled square matrix
 * @param {number} length
 * @returns {Array<Array<null>>} matrix
 */
export function squareMatrix(length) {
  const matrix = [];

  for (let i = 0; i < length; i++) {
    matrix.push([]);

    for (let j = 0; j < length; j++) {
      matrix[i].push(null);
    }
  }
  return matrix;
}

export function oppositeColor(color) {
  if (color === BLACK) return WHITE;
  if (color === WHITE) return BLACK;
  throw new Error("Calling oppositeColor with wrong argument");
}

/**
 * Dom Manipulation Utility Functions
 */

export function highlight(domElement) {
  domElement.classList.add("highlight");
}

export function removeHighlight(domElement) {
  domElement.classList.remove("highlight");
}

export function showLegalMoves(squares) {
  squares.forEach(square => {
    document.getElementById(square.name).classList.add("legal");
  });
}

export function hideLegalMove(domElement) {
  domElement.classList.remove("legal");
}

export function showCheck(king) {
  king.dom.parentNode.classList.add("check");
}

export function hideCheck(king) {
  king.dom.parentNode.classList.remove("check");
}

export function normalize(domElement) {
  hideLegalMove(domElement);
  removeHighlight(domElement);
}

export function modal(title, message, validateText, validateCallback, cancelText, cancelCallback) {
  const modal = document.querySelector("#modal-window");

  if (validateCallback) {
    let btn = modal.querySelector(".btn-validate");
    let newBtn = btn.cloneNode();
    modal.querySelector(".btn-container").replaceChild(newBtn, btn);
    newBtn.addEventListener("click", validateCallback);
    newBtn.addEventListener("click", event => modal.classList.add("hidden"));
  }
  if (cancelCallback) {
    let btn = modal.querySelector(".btn-cancel");
    let newBtn = btn.cloneNode();
    modal.querySelector(".btn-container").replaceChild(newBtn, btn);
    newBtn.addEventListener("click", cancelCallback);
    newBtn.addEventListener("click", event => modal.classList.add("hidden"));

    modal.querySelector(".btn-cancel").addEventListener("click", cancelCallback);
  }
  if (title) {
    modal.querySelector(".title").innerText = title;
  } else {
    modal.querySelector(".title").innerText = "";
  }
  if (message) {
    modal.querySelector(".message").innerText = message;
  } else {
    modal.querySelector(".message").innerText = "";
  }
  if (validateText) {
    modal.querySelector(".btn-validate").innerText = validateText;
  } else {
    modal.querySelector(".btn-validate").innerText = "OK";
  }

  if (cancelText) {
    modal.querySelector(".btn-cancel").innerText = cancelText;
    modal.querySelector(".btn-cancel").classList.remove("hidden");
  } else {
    modal.querySelector(".btn-cancel").classList.add("hidden");
  }
  modal.classList.remove("hidden");
}

document.querySelector("#modal-window .btn-cancel").addEventListener("click", event => document.querySelector("#modal-window").classList.add("hidden"));
document.querySelector("#modal-window .btn-validate").addEventListener("click", event => document.querySelector("#modal-window").classList.add("hidden"));
