import * as utils from "./utilities.js"
import {WHITE, BLACK, Direction} from "./constants.js"


class ChessBoard {
    constructor() {
        this.kings = {
            [WHITE]: null,
            [BLACK]: null,
        }
        this.pieces = {
            [WHITE]: [],
            [BLACK]: [],
        }
        this.directions = {
            [WHITE]: Direction.UP,
            [BLACK]: Direction.DOWN
        }
        this.collisions = utils.initCollisionBoard()
        this.turn = WHITE
        this.dom = document.getElementById("chess-board")

        this.createDomGrid()
    }

    getCellList() {
        return this.dom.querySelectorAll(".square")
    }

    getCell(Square) {
        return this.dom.querySelector(`.square#${Square.name}`)
    }

    movePiece = event => {
        const cell = event.currentTarget
        const position = utils.createSquareFromName(square.id)
        const piece = this.collisions[position.x, position.y]

        if (this.selectedPiece) {
            cell.appendChild(this.selectedPiece)
            if (piece) {
                piece.remove()
            }
            this.selectedPiece = false
            utils.highlight(cell)
        } else {
            this.getCellList().forEach((singleCell) => utils.removeHighlight(singleCell))

            if (piece) {
                utils.highlight(cell)
                this.selectedPiece = piece
            }
        }
    }

    addEvents() {
        this.getCellList().forEach((cell) => {
            cell.addEventListener("click", this.movePiece)
        })
        return this
    }

    createDomGrid() {
        const grid = []

        for (let i = 0; i < 8; i++) {
            const column = []

            for (let j = 0; j < 8; j++) {
                const square = document.createElement("div")
                const evenRow = i % 2
                const squareColor = (j % 2 === evenRow) ? "light" : "dark"
                square.className = `square ${squareColor}`
                square.id = utils.getSquareName(j, i)
                column.push(square)
            }
            grid.unshift(column)
        }
        grid.forEach(row => {
            row.forEach(cell => {
                this.dom.appendChild(cell)
            })
        })
    }

    render() {
        this.collisions.forEach(row => {
            row.forEach(piece => {
                if (piece) {
                    this.dom.querySelector(`#${piece.pos.name}`).appendChild(piece.dom)
                }
            })            
        })
    }

    addPiece(type, color, position) {
        const chessPiece = utils.chessPieceFactory(this, type, color, position)
    }
}
export default ChessBoard
