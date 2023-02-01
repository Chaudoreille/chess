import ChessPiece from "./ChessPiece.js"
import { ROOK } from "../constants.js"

class Rook extends ChessPiece {
    constructor(chessBoard, color, square) {
        super(chessBoard, color, square)
        this.type = ROOK
        this.dom.classList.add(`${this.color}-${this.type}`)
    }

   update() {
        super.update()

        this.updateLeft()
        this.updateRight()
        this.updateDown()
        this.updateUp()
        this.breakChecks()
    }

    // chessBreakerMoves() {
    //     super.chessBreakerMoves()

    //     let kingPos = this.board.kings[oppositeColor(this.color)].pos
    //     let positions = [kingPos, this.pos]
    //     positions.sort(utils.cmpPositions)

    //     for (let i = positions[0].x + 1; i < positions[1].x; i++) {
    //         for (let j = positions[0].y + 1; j < positions[1].y; j++) {
    //             this.checkBreakers.push(new Square(i,j))
    //         }
    //     }
    // }

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
}
export default Rook