import ChessPiece from "./ChessPiece.js"
import { PAWN } from "../constants.js"
import { inBounds } from "../utilities.js"

class Pawn extends ChessPiece {
    constructor(chessBoard, color, square) {
        super(chessBoard, color, square)
        this.type = PAWN
        this.dom.classList.add(`${this.color}-${this.type}`)
        this.direction = chessBoard.directions[color]
        this.starterPawn = true
        this.enPassant = false
    }

    move(square) {
        let enPassant = false;

        if (this.starterPawn == true) {
            this.starterPawn = false
            this.enPassant = true
        }
        let taken =  super.move(square)
    }

    update() {
        super.update()
        this.legalMoves = []
        let blocked = false
        let x = this.pos.x
        let y = this.pos.y + this.direction

        if (inBounds(x-1, y) && this.board.collisions[x-1][y]) {
            this.legalBoardSpace(x-1, y)
        }
        if (inBounds(x, y)) {
           if (!this.board.collisions[x][y]) {
            this.legalBoardSpace(x, y)
        } else {
            blocked = true
           }
        }
        if (inBounds(x+1, y) && this.board.collisions[x+1][y]) {
            this.legalBoardSpace(x+1, y)
        }

        if (this.starterPawn && !blocked) {
            y += this.direction
            if (inBounds(x, y) && !this.board.collisions[x][y]) {
                this.legalBoardSpace(x, y)
            }
        }

        x = this.pos.x
        y = this.pos.y

        /**
         * this crashes the program on update
         */
        // if (inBounds(x-1, y)  && this.board.collisions[x-1][y] &&
        // this.board.collisions[x-1][y].type === PAWN &&
        // this.board.collisions[x-1][y].color !== this.color &&
        // this.board.collisions[x-1][y].enPassant) {
        //     this.legalBoardSpace(x-1, y+this.direction)
        // }

        // if (inBounds(x+1, y)  && this.board.collisions[x+1][y] &&
        // this.board.collisions[x+1][y].type === PAWN &&
        // this.board.collisions[x-1][y].color !== this.color &&
        // this.board.collisions[x+1][y].enPassant) {
        //     this.legalBoardSpace(x+1, y+this.direction)
        // }
    }
}
export default Pawn