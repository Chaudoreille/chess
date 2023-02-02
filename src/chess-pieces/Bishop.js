import ChessPiece from "./ChessPiece.js"
import Square from "../Square.js"
import { BISHOP } from "../constants.js"
import { oppositeColor } from "../utilities.js"

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
        this.breakChecks()
    }

    checkBreakerMoves() {
        super.checkBreakerMoves()
        const king = this.board.kings[oppositeColor(this.color)]
        const inc_x = king.pos.x - this.pos.x !== 0 ? (king.pos.x - this.pos.x) / Math.abs(king.pos.x - this.pos.x) : 0
        const inc_y = king.pos.y - this.pos.y !== 0 ? (king.pos.y - this.pos.y) / Math.abs(king.pos.y - this.pos.y) : 0
        let x = this.pos.x + inc_x
        let y = this.pos.y + inc_y

        while (x !== king.pos.x && y !== king.pos.y) {
            this.checkBreakers.push(new Square(x,y))
            x += inc_x
            y += inc_y
        }
    }

    updateTopLeft() {
        let x = this.pos.x - 1
        let y = this.pos.y + 1

        while(this.legalBoardSpace(x,y)) {
            x--
            y++
        }
        return
    }

    updateTopRight() {
        let x = this.pos.x + 1
        let y = this.pos.y + 1

        while(this.legalBoardSpace(x,y)) {
            x++
            y++
        }
    }

    updateBottomLeft() {
        let x = this.pos.x - 1
        let y = this.pos.y - 1

        while(this.legalBoardSpace(x,y)) {
            x--
            y--
        }
    }

    updateBottomRight() {
        let x = this.pos.x + 1
        let y = this.pos.y - 1

        while(this.legalBoardSpace(x,y)) {
            x++
            y--
        }
    }
}
export default Bishop