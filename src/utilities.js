import { BLACK, WHITE } from "./engine/constants.js";

export function cmpPositions(a, b) {
  if (a.x === b.x) {
    return a.y - b.y;
  }
  return a.x - b.x;
}

export function pushIfInBounds(container, position) {
  if (inBounds(position.x, position.y)) {
    container.push(position);
  }
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
