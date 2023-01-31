class Rook extends ChessPiece {
    targets(ChessPiece) {
        return false
    }

    updateLegalMoves() {
        this.legalMoves = []
        this.updateLeft()
        this.updateRight()
        this.updateDown()
        this.updateUp()
    }

    updateLeft() {
        for (let i = thix.x; i >= 0; i--) {
            if (!this.legalBoardSpace(i, this.y)) {
                return
            }
        }
        return
    }

    updateRight() {
        for (let i = thix.x; i < 8; i++) {
            if (!this.legalBoardSpace(i, this.y)) {
                return
            }
        }
        return
    }

    updateDown() {
        for (let j = thix.y; j >= 0; j--) {
            if (!this.legalBoardSpace(this.x, j)) {
                return
            }
        }
        return
    }

    updateUp() {
        for (let j = thix.y; j < 8; i++) {
            if (!this.legalBoardSpace(this.x, j)) {
                return
            }
        }
        return
    }
}