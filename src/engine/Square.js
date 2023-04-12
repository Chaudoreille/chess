import { A_CHAR_CODE } from "./constants.js";

class Square {
  constructor(x, y) {
    x = Number(x);
    y = Number(y);
    if (isNaN(x) || isNaN(y) || !isFinite(x) || !isFinite(y)) {
      throw new Error(`invalid arguments for Square contructor: x = ${x} y = ${y}`);
    }
    this.x = x;
    this.y = y;
    this.name = Square.name(x, y);
    Object.freeze(this);
  }

  static fromName(name) {
    const x = name.charCodeAt(0) - A_CHAR_CODE;
    const y = +name[1] - 1;

    return new Square(x, y);
  }

  static name(x, y) {
    return `${String.fromCharCode(A_CHAR_CODE + (x % 26))}${y + 1}`;
  }
}

export default Square;
