class King extends ChessPiece {
    constructor(chessBoard, color, square) {
        super(chessBoard, color, square)
        this.type = KING
        this.dom.classList.add(`${this.color}-${this.type}`)
    }

    update() {
    }

    isCheck() {
        return false
    }

    isCheckmate() {
        return false
    }
}