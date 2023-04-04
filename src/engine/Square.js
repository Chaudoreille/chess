import { A_CHAR_CODE } from "./constants.js";

class Square {
  constructor(x, y) {
    if (isNaN(x) || isNaN(y)) {
      throw new Error("invalid arguments for Square contructor");
    }
    if (x < 0 || x >= 8 || y < 0 || y >= 8) {
      throw new Error(`Trying to create a Square out of bounds at ${x}:${y}.`);
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
    return `${String.fromCharCode(A_CHAR_CODE + x)}${y + 1}`;
  }
}

export default Square;