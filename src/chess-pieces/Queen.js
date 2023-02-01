import ChessPiece from "./ChessPiece.js"
import { QUEEN } from "../constants.js"

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