import ChessPiece from "./ChessPiece.js"
import { KING } from "../constants.js"

class King extends ChessPiece {
    constructor(chessBoard, color, square) {
        super(chessBoard, color, square)
        this.type = KING
        this.dom.classList.add(`${this.color}-${this.type}`)
    }

    spawn() {
        super.spawn()
        this.board.kings[this.color] = this
    }

    update() {
        super.update()
    }

    isCheck() {
        return false
    }

    isCheckmate() {
        return false
    }
}
export default King