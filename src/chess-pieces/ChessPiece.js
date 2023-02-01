import Square from "../Square.js"
import { inBounds, oppositeColor } from "../utilities.js"
import { PAWN } from "../constants.js"

class ChessPiece {
    constructor(chessBoard, color, square) {
        this.pos = square
        this.board = chessBoard
        this.type = null
        this.targets = []
        this.legalMoves = []
        this.pinned = []
        this.color = color
        this.dom = this.createDomChessPiece()
        this.spawn()
    }

    spawn() {
        this.board.collisions[this.pos.x][this.pos.y] = this
        this.board.pieces[this.color].push(this)
    }


    update() {
        this.legalMoves = []
        this.targets = []
    }

    /**
     * moves chess piece on the board
     * @throws
     *      - Illegal Move
     *      - Friendly Fire
     * @param {0} square
     * @returns
     *      - the taken piece if a piece was taken
     *      - false otherwise
     */
    move(square) {
        if (!this.legalMoves.find((move) => move.name === square.name)) {
            throw(new Error("Illegal Move"))
        }
        const takenPiece = this.board.collisions[square.x][square.y]
        if (takenPiece) {
            if (takenPiece.color === this.color) {
                throw(new Error("Friendly Fire"))
            } else if (takenPiece) {
                takenPiece.remove()
            }
        }

        this.board.collisions[this.pos.x][this.pos.y] = null
        this.board.collisions[square.x][square.y] = this
        this.pos = square
        this.board.update()

        this.board.pieces[oppositeColor(this.color)].forEach(element => {
            if (element.type == PAWN) {
                element.enPassant = false
            }
        })

        this.board.turn = oppositeColor(this.color)

        if (takenPiece) {
            return takenPiece
        } else {
            return false
        }
    }

    /**
     * utility method
     * if move is legal, will push to this.legalMoves
     * @param {0} x : column in the chess board
     * @param {1} y : row in the chess board
     * @returns
     *     - true if movement should continue
     *     - false if movement should stop
     */
    legalBoardSpace(x, y) {
        if (!inBounds(x, y)) {
            return false
        }
        this.targets.push(new Square(x,y))

        if (this.board.collisions[x][y] instanceof ChessPiece) {
            if (this.board.collisions[x][y].color !== this.color) {
                this.legalMoves.push(new Square(x, y))
            }
            return false
        }

        this.legalMoves.push(new Square(x, y))
        return true
    }

    createDomChessPiece() {
        let chessPieceDom = document.createElement("div")
        chessPieceDom.className = "chess-piece"

        return chessPieceDom
    }

    remove() {
        const pieceList = this.board.pieces[this.color]
        console.log(pieceList)
        for (let i = 0; i < pieceList.length; i++) {
            if (pieceList[i] === this) {
                console.log(pieceList[i])
                console.log(this)
                pieceList.splice(i, 1);
            }
        }
        this.board.collisions[this.pos.x][this.pos.y] = null
        this.board.taken[this.color] = this
        this.dom.remove()
    }
}
export default ChessPiece