class ChessPiece {
    constructor(chessBoard, square) {
        this.pos = square
        this.board = chessBoard
    }

    legalMoves() {
        return []
    }

    move(square) {
        this.pos = square
        return this
    }
}