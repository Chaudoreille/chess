/**
 * 
 * @returns a Chessboard mockup 
 */
const mockChessBoard = () => {
    return {
        kings: {
            [WHITE]: null,
            [BLACK]: null,
        },
        pieces: {
            [WHITE]: [],
            [BLACK]: [],
        },
        turn: WHITE,
        collisions: [
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null]
        ],
        freeSquare: () => true,
        populate: function(pieces) {
            pieces.forEach((piece) => {
                if (piece.type && piece.type == KING) {
                    this.kings[piece.color] = piece
                } else {
                    this.pieces[piece.color].push(piece)
                }
                this.collisions[piece.pos.x][piece.pos.y] = piece
            })
        },
    }
}

/**
 *
 * @param {Integer} x
 * @param {Integer} y
 * @param {String} name the square name (A1 for <0,0> to H8 for <7,7>)
 * @returns a Square mockup
 */
const mockSquare = (x, y, name) => {
    return {
        "x": x,
        "y": y,
        "name": name,
    }
}

/**
 *
 * @param {*} chessBoard
 * @param {*} color
 * @param {*} square
 * @returns a ChessPiece mockup
 */
const mockChessPiece = (chessBoard, color, square) => {
    return {
        board: chessBoard,
        pos: square,
        "color": color,
        legalMoves: [],
        targets: () => false,
        move: () => false,
    }
}