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
        for (let i = this.pos.x-1; i >= 0; i--) {
            if (!this.legalBoardSpace(i, this.pos.y)) {
                return
            }
        }
        return
    }

    updateRight() {
        for (let i = this.pos.x+1; i < 8; i++) {
            if (!this.legalBoardSpace(i, this.pos.y)) {
                return
            }
        }
        return
    }

    updateDown() {
        for (let j = this.pos.y-1; j >= 0; j--) {
            if (!this.legalBoardSpace(this.pos.x, j)) {
                return
            }
        }
        return
    }

    updateUp() {
        for (let j = this.pos.y+1; j < 8; j++) {
            if (!this.legalBoardSpace(this.pos.x, j)) {
                return
            }
        }
        return
    }
}