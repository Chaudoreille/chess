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

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                this.legalBoardSpace(this.pos.x + i, this.pos.y + j)
            }
        }
    }

    isCheck() {
        return false
    }

    isCheckmate() {
        return false
    }
}
export default King