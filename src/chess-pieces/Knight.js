class Knight {
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