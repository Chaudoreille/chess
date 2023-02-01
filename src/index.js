import ChessBoard from "./ChessBoard.js"
import { BLACK, WHITE, ROOK, BISHOP, KNIGHT, QUEEN, KING, PAWN } from "./constants.js"
import { getSquareName } from "./utilities.js"

const board = new ChessBoard()

board.addPiece(ROOK, WHITE, "a1" )
board.addPiece(KNIGHT, WHITE, "b1")
board.addPiece(BISHOP, WHITE, "c1")
board.addPiece(QUEEN, WHITE, "d1")
board.addPiece(KING, WHITE, "e1")
board.addPiece(BISHOP, WHITE, "f1")
board.addPiece(KNIGHT, WHITE, "g1")
board.addPiece(ROOK, WHITE, "h1")

board.addPiece(ROOK, BLACK, "a8")
board.addPiece(KNIGHT, BLACK, "b8")
board.addPiece(BISHOP, BLACK, "c8")
board.addPiece(QUEEN, BLACK, "d8")
board.addPiece(KING, BLACK, "e8")
board.addPiece(BISHOP, BLACK, "f8")
board.addPiece(KNIGHT, BLACK, "g8")
board.addPiece(ROOK, BLACK, "h8")

// for (let i = 0; i < 8; i++) {
//     board.addPiece(PAWN, WHITE, getSquareName(i, 1))
//     board.addPiece(PAWN, BLACK, getSquareName(i, 6))
// }

board.addEvents()
board.render()