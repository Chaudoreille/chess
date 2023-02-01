import { A_CHAR_CODE } from "./constants.js"
import { getSquareName } from "./utilities.js";

class Square {
    constructor(x, y) {
        if (x < 0 || x >= 8 || y < 0 || y >= 8) {
            throw new Error(`Trying to create a square out of bounds at ${x}:${y}.`)
        }
        this.x = x;
        this.y = y;
        this.name = getSquareName(x, y)
        Object.freeze(this)
    }
}
export default Square