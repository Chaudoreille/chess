class Knight extends ChessPiece {
    constructor(chessBoard, color, square) {
        super(chessBoard, color, square)
        this.type = KNIGHT
        this.dom.classList.add(`${this.color}-${this.type}`)
    }

    update() {
    }

}