import { BLACK, WHITE, ROOK, BISHOP, KNIGHT, QUEEN, KING, PAWN, A_CHAR_CODE } from "./constants.js"
import King from "./chess-pieces/King.js"
import Queen from "./chess-pieces/Queen.js"
import Rook from "./chess-pieces/Rook.js"
import Knight from "./chess-pieces/Knight.js"
import Bishop from "./chess-pieces/Bishop.js"
import Pawn from "./chess-pieces/Pawn.js"
import Square from "./Square.js"

export function cmpPositions(a, b) {
    if (a.x === b.x) {
        return a.y - b.y
    }
    return a.x - b.x
}

/**
 * ## checks if a x,y position is within board bounds
 * @param {Number} x 
 * @param {Number} y 
 * @returns 
 */
export function inBounds(x, y) {
    if (x < 0 || x > 7 ||
        y < 0 || y > 7) {
        return false
    }
    return true
}

export function pushIfInBounds(container, position) {
    if (inBounds(position.x, position.y)) {
        container.push(position)
    }
}

export function chessPieceFactory(chessBoard, type, color, position, ...rest) {
    const classes = {
        [KING]: King,
        [QUEEN]: Queen,
        [BISHOP]: Bishop,
        [KNIGHT]: Knight,
        [ROOK]: Rook,
        [PAWN]: Pawn,
    }
    const square = createSquareFromName(position)
    return new classes[type](chessBoard, color, square, rest);
}

export function createSquareFromName(name) {
    const x = name.charCodeAt(0) - A_CHAR_CODE
    const y = +name[1] - 1

    return new Square(x, y)
}

export function getSquareName(x, y) {
    return `${String.fromCharCode(A_CHAR_CODE + x)}${y+1}`
}

/**
 *
 * @returns a null - filled 8 * 8 matrix
 */
export function initCollisionBoard() {
    const board = []

    for (let i = 0; i < 8; i++) {
        board.push([])

        for (let j = 0; j < 8; j++) {
            board[i].push(null)
        }
    }
    return board
}

export function oppositeColor(color) {
    if (color === BLACK) return WHITE
    if (color === WHITE) return BLACK
    throw new Error("Calling oppositeColor with wrong argument")
}

/**
 * Dom Manipulation Utility Functions
 */

export function highlight(domElement) {
    domElement.classList.add("highlight")
}

export function removeHighlight(domElement) {
    domElement.classList.remove("highlight")
}

export function showLegalMoves(squares) {
    squares.forEach(square => {
        document.getElementById(square.name).classList.add("legal")
    })
}

export function hideLegalMove(domElement) {
    domElement.classList.remove("legal")
}

export function showCheck(king) {
    king.dom.parentNode.classList.add("check")
}

export function hideCheck(king) {
    king.dom.parentNode.classList.remove("check")
}

export function normalize(domElement) {
    hideLegalMove(domElement)
    removeHighlight(domElement)
}