class Pawn extends ChessPiece {
    constructor(chessBoard, color, square) {
        super(chessBoard, color, square)
        this.type = PAWN
        this.dom.classList.add(`${this.color}-${this.type}`)
        this.direction = chessBoard.directions[color]
    }

    update() {
    }
}