import Square from "./engine/Square.js";
import { BLACK, WHITE } from "./engine/constants.js";

/**
 * Compares 2 squares along x then y axis.
 * 
 * a is greater than b if (in order):
 * 1) a.x > b.x
 * 2) a.y > b.y
 * @param {Square} a 
 * @param {Square} b 
 * @returns 
 * - n > 0  - if a is greater than b.
 * - 0      - if a is equal to b. 
 * - n < 0  - if a is lower than b.
 */
export function cmpPositions(a, b) {
  if (a.x === b.x) {
    return a.y - b.y;
  }
  return a.x - b.x;
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

/**
 * returns the color opposite to argument
 * @param {BLACK|WHITE} color 
 * @returns {BLACK|WHITE}
 * @throws TypeError
 */
export function oppositeColor(color) {
  if (color === BLACK) return WHITE;
  if (color === WHITE) return BLACK;
  throw new TypeError(`${color} is not a valid color`);
}

/**
 * Dom Manipulation Utility Functions
 */

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
  modal.querySelector(".title").innerText = title || "";
  modal.querySelector(".message").innerText = message || "";
  modal.querySelector(".btn-validate").innerText = validateText || "OK";
  modal.querySelector(".btn-cancel").innerText = cancelText || "";

  if (cancelText) {
    modal.querySelector(".btn-cancel").classList.remove("hidden");
  } else {
    modal.querySelector(".btn-cancel").classList.add("hidden");
  }
  modal.classList.remove("hidden");
}

document.querySelector("#modal-window .btn-cancel").addEventListener("click", event => document.querySelector("#modal-window").classList.add("hidden"));
document.querySelector("#modal-window .btn-validate").addEventListener("click", event => document.querySelector("#modal-window").classList.add("hidden"));
