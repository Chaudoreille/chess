import ChessPiece from "./ChessPiece.js"
import { PAWN } from "../constants.js"
import { inBounds } from "../utilities.js"

class Pawn extends ChessPiece {
    constructor(chessBoard, color, square) {
        super(chessBoard, color, square)
        this.type = PAWN
        this.dom.classList.add(`${this.color}-${this.type}`)
        this.direction = chessBoard.directions[color]
    }

    update() {
        this.legalMoves = []
        let x = this.pos.x-1
        const y = this.pos.y + this.direction

        if (inBounds(x, y) && this.board.collisions[x][y]) {
            this.legalBoardSpace(x, y)
        }
        x = this.pos.x
        if (inBounds(x, y) && !this.board.collisions[x][y]) {
            this.legalBoardSpace(x, y)
        }
        x = this.pos.x + 1
        if (inBounds(x, y) && this.board.collisions[x][y]) {
            this.legalBoardSpace(x, y)
        }
    }
}
export default Pawn