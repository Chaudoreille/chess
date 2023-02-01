describe('Bishop', function() {
    let position = mockSquare(4,4)
    const color = BLACK
    const opposingColor = WHITE
    let chessBoard, friends, foes, bishop

    beforeEach(() => {
        chessBoard = mockChessBoard()
        bishop = new Bishop(chessBoard, color, position)
        chessBoard.populate([bishop])
        friends = [
            new Bishop(chessBoard, color, mockSquare(bishop.pos.x-1, bishop.pos.y-1)),
            new Bishop(chessBoard, color, mockSquare(bishop.pos.x-1, bishop.pos.y+1)),
            new Bishop(chessBoard, color, mockSquare(bishop.pos.x+1, bishop.pos.y-1)),
            new Bishop(chessBoard, color, mockSquare(bishop.pos.x+1, bishop.pos.y+1))
        ]
        foes = [
            new Bishop(chessBoard, opposingColor, mockSquare(bishop.pos.x-1, bishop.pos.y-1)),
            new Bishop(chessBoard, opposingColor, mockSquare(bishop.pos.x-1, bishop.pos.y+1)),
            new Bishop(chessBoard, opposingColor, mockSquare(bishop.pos.x+1, bishop.pos.y-1)),
            new Bishop(chessBoard, opposingColor, mockSquare(bishop.pos.x+1, bishop.pos.y+1))
        ]
    });

    it('should be declared', () => {
        expect(typeof Bishop).toBe('function');
    });

    describe('targets method', () => {
        it("should be declared", function() {
            expect(typeof bishop.targets).toEqual("function")
        });
        it("should return true when chessPiece's position is in bishop's legal moves", function() {
        });

        it("should return false when chessPiece's position is not in bishop's legal moves", function() {
        });
    });

    describe('update method', () => {
        it("should be declared", function() {
            expect(typeof bishop.update).toEqual("function")
        });

        it("should update bishop.legalMoves with 2 diagonals centered on it's square on an empty board", function () {
            bishop.update()
            let legalSquares = []

            for (let i = 1; i < 8; i++) {
                pushIfInBounds(legalSquares, mockSquare(bishop.pos.x+i, bishop.pos.y+i))
                pushIfInBounds(legalSquares, mockSquare(bishop.pos.x+i, bishop.pos.y-i))
                pushIfInBounds(legalSquares, mockSquare(bishop.pos.x-i, bishop.pos.y-i))
                pushIfInBounds(legalSquares, mockSquare(bishop.pos.x-i, bishop.pos.y+i))
            }
            legalSquares.sort(cmpPositions)
            bishop.legalMoves.sort(cmpPositions)

            expect(bishop.legalMoves.length).toEqual(legalSquares.length)
            for (let i = 0; i < bishop.legalMoves.length; i++) {
                expect(cmpPositions(bishop.legalMoves[i], legalSquares[i])).toEqual(0)
            }
        });
        it("should leave bishop.legalMoves empty when surrounded by same color pieces", function () {
            chessBoard.populate(friends)
            bishop.update()

            expect(bishop.legalMoves.length).toEqual(0)
        });
        it("should update bishop.legalMoves to exactly four elements when surrounded by opposite color pieces", function () {
            chessBoard.populate(foes)
            bishop.update()

            expect(bishop.legalMoves.length).toEqual(4)
        });
    });
});
