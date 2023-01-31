class Pawn extends ChessPiece {
    constructor(chessBoard, color, square, direction) {
        super(chessBoard, color, square)
        this.direction = direction
    }

    updateLegalMoves() {
    }

    targets(ChessPiece) {
        return false
    }
}