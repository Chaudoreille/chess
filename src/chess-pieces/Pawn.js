class Pawn extends ChessPiece {
    constructor(direction) {
        super()
        this.direction = direction
    }

    updateLegalMoves() {
    }

    targets(ChessPiece) {
        return false
    }
}