import ChessPiece from "./ChessPiece.js"
import { KING } from "../constants.js"
import { inBounds } from "../utilities.js"

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
                let x = this.pos.x + i
                let y = this.pos.y + j
                if (inBounds(x, y)) {
                    this.legalBoardSpace(x,y)
                }
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