import { getSquareName } from "../utilities.js";

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
    this.name = getSquareName(x, y);
    Object.freeze(this);
  }
}
export default Square;