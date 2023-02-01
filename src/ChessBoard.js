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
            [WHITE]: Directions.UP,
            [BLACK]: Directions.DOWN
        }
        this.turn = WHITE
        this.collisions = initCollisionBoard()
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
        const position = createSquareFromName(square.id)
        const piece = this.collisions[position.x, position.y]

        if (this.selectedPiece) {
            cell.appendChild(this.selectedPiece)
            if (piece) {
                piece.remove()
            }
            this.selectedPiece = false
            highlight(cell)
        } else {
            this.getCellList().forEach((singleCell) => removeHighlight(singleCell))

            if (piece) {
                highlight(cell)
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
            const row = []
            for (let j = 0; j < 8; j++) {
                const square = document.createElement("div")
                const evenRow = Math.floor(i / 8) % 2
                const squareColor = (i % 2 === evenRow) ? "light" : "dark"
                square.className = `square ${squareColor}`
                square.id = getSquareName(x,y)
                row.push(square)
            }
            grid.unshift(row)
        }
        grid.forEach(row => {
            row.forEach(cell => {
                this.dom.appendChild(cell)
            })
        })
    }

    render() {
        this.createDomGrid()
        for (piece in this.collisions) {
            if (piece) {
                this.dom.querySelector(`#${piece.pos.name}`).appendChild(piece.dom)
            }
        }
    }

    addPiece(type, color, position) {
        chessPiece = chessPieceFactory(this, piece.type, piece.color, piece.position)
    }
}

