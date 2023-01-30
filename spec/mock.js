/**
 * 
 * @returns a Chessboard mockup 
 */
const mockChessBoard = () => {
    return {
        kings: [],
        blackPieces: [],
        whitePieces: [],
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
    }
}

const mockSquare = (x, y, name) => {
    return {
        "x": x,
        "y": y,
        "name": name
    }
}