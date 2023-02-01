describe('Queen', function() {
    let position = mockSquare(2,2,"B3")
    const color = BLACK
    const opposingColor = WHITE
    let chessBoard, friends, foes, queen

    beforeEach(() => {
        chessBoard = mockChessBoard()
        queen = new Queen(chessBoard, color, position)
        chessBoard.populate([queen])
        friends = [
            new Queen(chessBoard, color, mockSquare(queen.pos.x-1, queen.pos.y-1)),
            new Queen(chessBoard, color, mockSquare(queen.pos.x-1, queen.pos.y)),
            new Queen(chessBoard, color, mockSquare(queen.pos.x-1, queen.pos.y+1)),
            new Queen(chessBoard, color, mockSquare(queen.pos.x, queen.pos.y-1)),
            new Queen(chessBoard, color, mockSquare(queen.pos.x, queen.pos.y+1)),
            new Queen(chessBoard, color, mockSquare(queen.pos.x+1, queen.pos.y-1)),
            new Queen(chessBoard, color, mockSquare(queen.pos.x+1, queen.pos.y)),
            new Queen(chessBoard, color, mockSquare(queen.pos.x+1, queen.pos.y+1))
        ]
        foes = [
            new Queen(chessBoard, opposingColor, mockSquare(queen.pos.x-1, queen.pos.y-1)),
            new Queen(chessBoard, opposingColor, mockSquare(queen.pos.x-1, queen.pos.y)),
            new Queen(chessBoard, opposingColor, mockSquare(queen.pos.x-1, queen.pos.y+1)),
            new Queen(chessBoard, opposingColor, mockSquare(queen.pos.x, queen.pos.y-1)),
            new Queen(chessBoard, opposingColor, mockSquare(queen.pos.x, queen.pos.y+1)),
            new Queen(chessBoard, opposingColor, mockSquare(queen.pos.x+1, queen.pos.y-1)),
            new Queen(chessBoard, opposingColor, mockSquare(queen.pos.x+1, queen.pos.y)),
            new Queen(chessBoard, opposingColor, mockSquare(queen.pos.x+1, queen.pos.y+1))
        ]
    });

    it('should be declared', () => {
        expect(typeof Queen).toBe('function');
    });

    describe('targets method', () => {
        it("should be declared", function() {
            expect(typeof queen.targets).toEqual("function")
        });
        it("should return false", function() {
            expect(queen.targets(foes[0])).toEqual(false)
        });
    });

    describe('update method', () => {
        it("should be declared", function() {
            expect(typeof queen.update).toEqual("function")
        });

        it("should update queen.legalMoves with 2 diagonals, a complete row and column on an empty board", function () {
            queen.update()
            let legalSquares = []

            for (let i = 0; i < 8; i++) {
                if (queen.pos.x !== i) {
                    legalSquares.push(mockSquare(queen.pos.x, i))
                }
                if (queen.pos.y !== i) {
                    legalSquares.push(mockSquare(i, queen.pos.y))
                }
            }
            for (let i = 0; i < 8; i++) {
                pushIfInBounds(legalSquares, mockSquare(queen.pos.x+i, queen.pos.y+i))
                pushIfInBounds(legalSquares, mockSquare(queen.pos.x+i, queen.pos.y-i))
                pushIfInBounds(legalSquares, mockSquare(queen.pos.x-i, queen.pos.y-i))
                pushIfInBounds(legalSquares, mockSquare(queen.pos.x-i, queen.pos.y+i))
            }

            legalSquares.sort(cmpPositions)
            queen.legalMoves.sort(cmpPositions)

            expect(queen.legalMoves.length).toEqual(legalSquares.length)
            for (let i = 0; i < queen.legalMoves.length; i++) {
                expect(cmpPositions(queen.legalMoves[i], legalSquares[i])).toEqual(0)
            }
        });
        it("should leave queen.legalMoves empty when surrounded by same color pieces", function () {
            chessBoard.populate(friends)
            queen.update()

            expect(queen.legalMoves.length).toEqual(0)
        });
        it("should update queen.legalMoves to exactly four elements when surrounded by opposite color pieces", function () {
            chessBoard.populate(foes)
            queen.update()

            expect(queen.legalMoves.length).toEqual(8)
        });
    });
});
