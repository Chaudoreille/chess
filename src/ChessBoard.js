class ChessBoard {
    constructor() {
        this.blackPieces = []
        this.whitePieces = []
        this.turn = false
        this.collisions = initCollisionBoard()
    }

    freeSquare(square) {
        return true
    }
}

/*
 * creates a null - filled 8 * 8 matrix 
 */ 
function initCollisionBoard() {
    const board = []

    for (let i = 0; i < 8; i++) {
        board.push([])

        for (let j = 0; j < 8; j++) {
            board[i].push(null)
        }
    }
    return board
}