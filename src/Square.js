const H_CHAR_CODE = 73

class Square {
    constructor(x, y) {
        if (x < 0 || x >= 8 || y < 0 || y >= 8) {
            throw new Error(`Trying to create a square out of bounds at ${x}:${y}.`)
        }
        this.x = x;
        this.y = y;
        this.name = `${String.fromCharCode(H_CHAR_CODE - y)}${x+1}`
        Object.freeze(this)
    }
}
