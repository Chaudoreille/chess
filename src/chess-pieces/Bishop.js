import ChessPiece from "./ChessPiece.js"
import { BISHOP } from "../constants.js"
import { inBounds } from "../utilities.js"

class Bishop extends ChessPiece {
    constructor(chessBoard, color, square) {
        super(chessBoard, color, square)
        this.type = BISHOP
        this.dom.classList.add(`${this.color}-${this.type}`)
    }

    update() {
        super.update()
        this.updateTopLeft()
        this.updateTopRight()
        this.updateBottomLeft()
        this.updateBottomRight()
    }

    updateTopLeft() {
        let x = this.pos.x - 1
        let y = this.pos.y + 1

        while(inBounds(x,y)) {
            if (!this.legalBoardSpace(x,y)) return
            x--
            y++
        }
        return
    }

    updateTopRight() {
        let x = this.pos.x + 1
        let y = this.pos.y + 1

        while(inBounds(x,y)) {
            if (!this.legalBoardSpace(x,y)) return
            x++
            y++
        }
        return
    }

    updateBottomLeft() {
        let x = this.pos.x - 1
        let y = this.pos.y - 1

        while(inBounds(x,y)) {
            if (!this.legalBoardSpace(x,y)) return
            x--
            y--
        }
        return
    }

    updateBottomRight() {
        let x = this.pos.x + 1
        let y = this.pos.y - 1

        while(inBounds(x,y)) {
            if (!this.legalBoardSpace(x,y)) return
            x++
            y--
        }
        return
    }
}
export default Bishop