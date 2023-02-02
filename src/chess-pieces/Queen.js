import Square from "../Square.js"
import ChessPiece from "./ChessPiece.js"
import { QUEEN } from "../constants.js"
import { oppositeColor, cmpPositions } from "../utilities.js"

class Queen extends ChessPiece {
    constructor(chessBoard, color, square) {
        super(chessBoard, color, square)
        this.type = QUEEN
        this.dom.classList.add(`${this.color}-${this.type}`)
    }

    update() {
        super.update()
        this.updateLeft()
        this.updateRight()
        this.updateDown()
        this.updateUp()
        this.updateTopLeft()
        this.updateTopRight()
        this.updateBottomLeft()
        this.updateBottomRight()
        this.breakChecks()
    }

    checkBreakerMoves() {
        super.checkBreakerMoves()
        const king = this.board.kings[oppositeColor(this.color)]
        const positions = [king.pos, this.pos]
        positions.sort(cmpPositions)

        if (positions[0].x === positions[1].x) {
            for (let i = positions[0].y+1; i < positions[1].y; i++) {
                this.checkBreakers.push(new Square(positions[0].x, i))
            }
        } else {
            for (let i = positions[0].x+1; i < positions[1].x; i++) {
                this.checkBreakers.push(new Square(i, positions[0].y))
            }
        }

        const inc_x = (king.pos.x - this.pos.x) / Math.abs(king.pos.x - this.pos.x)
        const inc_y = (king.pos.y - this.pos.y) / Math.abs(king.pos.y - this.pos.y)
        let x = this.pos.x + inc_x
        let y = this.pos.y + inc_y

        while (x !== king.pos.x && y !== king.pos.y) {
            this.checkBreakers.push(new Square(x,y))
            x += inc_x
            y += inc_y
        }
    }

    updateLeft() {
        for (let i = this.pos.x-1; i >= 0; i--) {
            if (!this.legalBoardSpace(i, this.pos.y)) {
                return
            }
        }
        return
    }

    updateRight() {
        for (let i = this.pos.x+1; i < 8; i++) {
            if (!this.legalBoardSpace(i, this.pos.y)) {
                return
            }
        }
        return
    }

    updateDown() {
        for (let j = this.pos.y-1; j >= 0; j--) {
            if (!this.legalBoardSpace(this.pos.x, j)) {
                return
            }
        }
        return
    }

    updateUp() {
        for (let j = this.pos.y+1; j < 8; j++) {
            if (!this.legalBoardSpace(this.pos.x, j)) {
                return
            }
        }
        return
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
export default Queen