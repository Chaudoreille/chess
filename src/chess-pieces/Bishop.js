class Bishop extends ChessPiece {
    targets(ChessPiece) {
        return false
    }

    updateLegalMoves() {
        this.legalMoves = []
        this.updateTopLeft()
        this.updateTopRight()
        this.updateBottomLeft()
        this.updateBottomRight()
    }

    updateTopLeft() {
        let x = this.pos.x - 1
        let y = this.pos.y + 1

        while(inBounds(x,y)) {
            if (!this.legalBoardSpace(x,y)) return
            x--
            y++
        }
        return
    }

    updateTopRight() {
        let x = this.pos.x + 1
        let y = this.pos.y + 1

        while(inBounds(x,y)) {
            if (!this.legalBoardSpace(x,y)) return
            x++
            y++
        }
        return
    }

    updateBottomLeft() {
        let x = this.pos.x - 1
        let y = this.pos.y - 1

        while(inBounds(x,y)) {
            if (!this.legalBoardSpace(x,y)) return
            x--
            y--
        }
        return
    }

    updateBottomRight() {
        let x = this.pos.x + 1
        let y = this.pos.y - 1

        while(inBounds(x,y)) {
            if (!this.legalBoardSpace(x,y)) return
            x++
            y--
        }
        return
    }
}