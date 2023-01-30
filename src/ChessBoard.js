class ChessBoard {
    constructor() {
        this.blackPieces = []
        this.whitePieces = []
        this.initBoard()
        this.turn = false
        
    }

    freeSquare(square) {
        return true
    }

    initBoard() {
        let board = []
        for (let i = 0; i < 8; i++) {
            board[i] = []
            for (let j = 0; j < 8; j++) {
                board[i][j] = null;
            }
        }
        this.board = board
    }
}

class DisplayChessBoard {
    constructor () {
        this.dom = {
            board:  document.getElementById("chess-board"),
        }
        this.squares = []
        for (let i = 0; i < 64; i++) {
            let square = document.createElement("div")
            let evenRow = Math.floor(i / 8) % 2
            let squareColor = (i % 2 === evenRow) ? "light" : "dark"
            square.className = `square ${squareColor}`
            this.dom.board.appendChild(square)
            this.squares.push(null)
        }
        this.dom.squares = this.dom.board.querySelectorAll(".square")
        this.selectedPiece = false
    }

    setupPieces() {
        function addPawns(arr, color, start) {
            for (let i = start; i < start + 8; i++) {
                arr[i] = `${color}-pawn`
            }
            return arr
        }
        function addBackRow(arr, color, start, queenFirst = false) {
            arr[start] = `${color}-rook`
            arr[start+1] = `${color}-knight`
            arr[start+2] = `${color}-bishop`
            if (queenFirst) {
                arr[start+3] = `${color}-queen`
                arr[start+4] = `${color}-king`
            } else {
                arr[start+3] = `${color}-king`
                arr[start+4] = `${color}-queen`
            }
            arr[start+5] = `${color}-bishop`
            arr[start+6] = `${color}-knight`
            arr[start+7] = `${color}-rook`
        }

        addBackRow(this.squares, "black", 0)
        addPawns(this.squares, "black", 8)
        addPawns(this.squares, "white", 64 - 16)
        addBackRow(this.squares, "white", 64-8, true)

        return this
    }

    addEvents() {
        this.dom.squares.forEach((square) => {
            square.addEventListener("click", this.movePiece)
        })
        return this
    }

    movePiece = event => {
        const square = event.currentTarget
        const piece = square.querySelector(".chess-piece")

        if (this.selectedPiece) {
            square.appendChild(this.selectedPiece)
            if (piece) piece.remove()
            this.selectedPiece = false
            square.classList.add("highlight")
        } else {
            this.dom.squares.forEach((square) => square.classList.remove("highlight"))
            if (piece) {
                square.classList.add("highlight");
                this.selectedPiece = piece
            }
        }
    }

    render() {
        this.squares.forEach((square, i) => {
            let chessPiece = this.dom.squares[i].querySelector(".chess-piece")
            if (square) {
                let chessPiece = document.createElement("div")
                chessPiece.className = "chess-piece " + square
                this.dom.squares[i].appendChild(chessPiece)
            }
        })
        return this
    }

}

export default DisplayChessBoard