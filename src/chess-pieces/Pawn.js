class Pawn {
    constructor(direction) {
        super()
        this.direction = direction
    }
    legalMoves() {
        return []
    }

    move(square) {
        this.pos = square
        return this
    }

    targets(ChessPiece) {
        return false
    }
}