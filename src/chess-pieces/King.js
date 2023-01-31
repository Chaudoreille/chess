class King extends ChessPiece {
    updateLegalMoves() {
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