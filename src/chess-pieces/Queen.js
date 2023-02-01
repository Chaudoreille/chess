class Queen extends ChessPiece {
    constructor(chessBoard, color, square) {
        super(chessBoard, color, square)
        this.type = QUEEN
        this.dom.classList.add(`${this.color}-${this.type}`)
    }

    update() {
    }
}