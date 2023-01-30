class King {
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

    isCheck() {
        return false
    }

    isCheckmate() {
        return false
    }
}