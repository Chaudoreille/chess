import ChessBoard from "./ChessBoard.js"
import { BLACK, WHITE, ROOK, BISHOP, KNIGHT, QUEEN, KING, PAWN } from "./constants.js"
import { getSquareName, modal } from "./utilities.js"

let board;

document.querySelector("#new-game-btn").addEventListener("click", event => {
    modal("Are you sure you want to restart ?", "Your current game will be lost", "Yes", newGame, "No")
})


export function newGame() {
    document.querySelector("#chess-board").innerHTML = ""
    document.querySelectorAll("#taken-pieces .taken").forEach(prison => prison.innerHTML = "")
    board = new ChessBoard()

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
    
    for (let i = 0; i < 8; i++) {
        board.addPiece(PAWN, WHITE, getSquareName(i, 1))
        board.addPiece(PAWN, BLACK, getSquareName(i, 6))
    }
    
    board.addEvents()
    board.render()
    
    const whitePieceNumber = board.pieces[WHITE].length - 1
    const blackPieceNumber = board.pieces[BLACK].length - 1
    
    for (let i = 0; i < whitePieceNumber; i++) {
        const cell = document.createElement("div")
        cell.className = "square"
        document.querySelector("#white-prison .taken").appendChild(cell)
    }
    for (let i = 0; i < blackPieceNumber; i++) {
        const cell = document.createElement("div")
        cell.className = "square"
        document.querySelector("#black-prison .taken").appendChild(cell)
    }
}

newGame()