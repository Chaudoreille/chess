class Square {
    constructor(x, y) {
        if (x < 0 || x >= 8 || y < 0 || y >= 8) {
            throw new Error(`Trying to create a square out of bounds at ${x}:${y}.`)
        }
        this.x = x;
        this.y = y;
    }

    squareName() {
        let charCodeForG = 72
        return `${String.fromCharCode(charCodeForG - y)}${x+1}`
    }    
}
