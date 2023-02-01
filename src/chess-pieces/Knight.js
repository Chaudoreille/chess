import ChessPiece from "./ChessPiece.js"
import { KNIGHT } from "../constants.js"

class Knight extends ChessPiece {
    constructor(chessBoard, color, square) {
        super(chessBoard, color, square)
        this.type = KNIGHT
        this.dom.classList.add(`${this.color}-${this.type}`)
    }

    update() {
    }

}
export default Knight