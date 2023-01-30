class ChessPiece {
    constructor(chessBoard, color, square) {
        this.pos = square
        this.board = chessBoard
        this.legalMoves = []
        this.color = color
    }

    updateLegalMoves() {}

    /*
    * returns taken piece if a piece was taken || false
    */
    move(square) {
        if (!legalMoves.find((move) => move.name === square.name)) {
            throw(new Error("Illegal Move"))
        }

        const takenPiece = this.board.collisions[square.x][square.y]

        if (takenPiece && takenPiece.color === this.color) {
            throw(new Error("attempting to take a piece of the same color"))
        }

        this.board.collisions[square.x][square.y] = this
        this.pos = square
        this.updateLegalMoves()

        if (takenPiece) {
            return takenPiece
        } else {
            return false
        }
    }

    targets(ChessPiece) {
        return false
    }

    /*
    * utility method
    * if move is legal, will push to this.legalMoves
    * return value:
    *      - true if movement should continue
    *      - false if movement should stop
    */
    pushMoveIfLegal(x, y) {
        if (this.board[x][y] instanceof ChessPiece) {
            if (this.board[x][y].color !== this.color) {
                legalMoves.push(new Square(x, y))
            }
            return false
        }
        legalMoves.push(new position(x, y))
        return true
    }
}