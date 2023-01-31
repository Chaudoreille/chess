describe('Rook', function() {
    let position = mockSquare(2,2,"B3")
    const color = BLACK
    const opposingColor = WHITE
    let chessBoard, friends, foes, rook

    beforeEach(() => {
        chessBoard = mockChessBoard()
        rook = new Rook(chessBoard, color, position)
        chessBoard.populate([rook])
        friends = [
            new Rook(chessBoard, color, mockSquare(rook.pos.x-1, rook.pos.y)),
            new Rook(chessBoard, color, mockSquare(rook.pos.x+1, rook.pos.y)),
            new Rook(chessBoard, color, mockSquare(rook.pos.x, rook.pos.y-1)),
            new Rook(chessBoard, color, mockSquare(rook.pos.x, rook.pos.y+1))
        ]
        foes = [
            new Rook(chessBoard, opposingColor, mockSquare(rook.pos.x-1, rook.pos.y)),
            new Rook(chessBoard, opposingColor, mockSquare(rook.pos.x+1, rook.pos.y)),
            new Rook(chessBoard, opposingColor, mockSquare(rook.pos.x, rook.pos.y-1)),
            new Rook(chessBoard, opposingColor, mockSquare(rook.pos.x, rook.pos.y+1))
        ]
    });

    it('should be declared', () => {
        expect(typeof Rook).toBe('function');
    });

    describe('targets method', () => {
        it("should be declared", function() {
            expect(typeof rook.targets).toEqual("function")
        });
        it("should return true when chessPiece's position is in bishop's legal moves", function() {
        });

        it("should return false when chessPiece's position is not in bishop's legal moves", function() {
        });
    });

    describe('updateLegalMoves method', () => {
        it("should be declared", function() {
            expect(typeof rook.updateLegalMoves).toEqual("function")
        });

        it("should update rook.legalMoves with a complete row and column on an empty board", function () {
            rook.updateLegalMoves()
            let legalSquares = []

            for (let i = 0; i < 8; i++) {
                if (rook.pos.x !== i) {
                    legalSquares.push(mockSquare(rook.pos.x, i))
                }
                if (rook.pos.y !== i) {
                    legalSquares.push(mockSquare(i, rook.pos.y))
                }
            }
            legalSquares.sort(cmpPositions)
            rook.legalMoves.sort(cmpPositions)

            expect(rook.legalMoves.length).toEqual(legalSquares.length)
            for (let i = 0; i < rook.legalMoves.length; i++) {
                expect(cmpPositions(rook.legalMoves[i], legalSquares[i])).toEqual(0)
            }
        });
        it("should leave rook.legalMoves empty when surrounded by same color pieces", function () {
            chessBoard.populate(friends)
            rook.updateLegalMoves()

            expect(rook.legalMoves.length).toEqual(0)
        });
        it("should update rook.legalMoves to exactly four elements when surrounded by opposite color pieces", function () {
            chessBoard.populate(foes)
            rook.updateLegalMoves()

            expect(rook.legalMoves.length).toEqual(4)
        });
    });
});
