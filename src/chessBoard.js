class chessBoard {
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
        for (let i = 0; i < 8) {
            board[i] = []
            for (let j = 0; j < 8; j++) {
                board[i][j] = null;
            }
        }
        this.board = board
    }
}
