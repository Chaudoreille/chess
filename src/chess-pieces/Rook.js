class Rook extends ChessPiece {
    legalMoves() {
        const legalMoves = []
        for (let i = 0; i < 8; i++) {
            if (i !== this.y) {
                legalMoves.push(new Square(i, this.y))
            }
            if (i !== this.x) {
                legalMoves.push(new Square(this.x, i))
            }
        }
    }
}