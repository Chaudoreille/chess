describe('King', function() {
    let position = mockSquare(4,4)
    const color = BLACK
    const opposingColor = WHITE
    let chessBoard, friends, foes, king

    beforeEach(() => {
        chessBoard = mockChessBoard()
        king = new King(chessBoard, color, position)
        chessBoard.populate([king])
        friends = [
            new King(chessBoard, color, mockSquare(king.pos.x-1, king.pos.y-1)),
            new King(chessBoard, color, mockSquare(king.pos.x-1, king.pos.y)),
            new King(chessBoard, color, mockSquare(king.pos.x-1, king.pos.y+1)),
            new King(chessBoard, color, mockSquare(king.pos.x, king.pos.y-1)),
            new King(chessBoard, color, mockSquare(king.pos.x, king.pos.y+1)),
            new King(chessBoard, color, mockSquare(king.pos.x+1, king.pos.y-1)),
            new King(chessBoard, color, mockSquare(king.pos.x+1, king.pos.y)),
            new King(chessBoard, color, mockSquare(king.pos.x+1, king.pos.y+1))
        ]
        foes = [
            new King(chessBoard, opposingColor, mockSquare(king.pos.x-1, king.pos.y-1)),
            new King(chessBoard, opposingColor, mockSquare(king.pos.x-1, king.pos.y)),
            new King(chessBoard, opposingColor, mockSquare(king.pos.x-1, king.pos.y+1)),
            new King(chessBoard, opposingColor, mockSquare(king.pos.x, king.pos.y-1)),
            new King(chessBoard, opposingColor, mockSquare(king.pos.x, king.pos.y+1)),
            new King(chessBoard, opposingColor, mockSquare(king.pos.x+1, king.pos.y-1)),
            new King(chessBoard, opposingColor, mockSquare(king.pos.x+1, king.pos.y)),
            new King(chessBoard, opposingColor, mockSquare(king.pos.x+1, king.pos.y+1))
        ]
    });

    it('should be declared', () => {
        expect(typeof King).toBe('function');
    });

    describe('targets method', () => {
        it("should be declared", function() {
            expect(typeof king.targets).toEqual("function")
        });
        it("should return true when chessPiece's position is in king's legal moves", function() {
        });

        it("should return false when chessPiece's position is not in king's legal moves", function() {
        });
    });

    describe('update method', () => {
        it("should be declared", function() {
            expect(typeof king.update).toEqual("function")
        });

        it("should update king.legalMoves with 2 diagonals on an empty board", function () {
            king.update()
            let legalSquares = [
                mockSquare(king.pos.x-i, king.pos.y-i),
                mockSquare(king.pos.x-i, king.pos.y+i),
                mockSquare(king.pos.x, king.pos.y-i),
                mockSquare(king.pos.x, king.pos.y+i),
                mockSquare(king.pos.x+i, king.pos.y-i),
                mockSquare(king.pos.x+i, king.pos.y+i)
            ]

            legalSquares.sort(cmpPositions)
            king.legalMoves.sort(cmpPositions)

            expect(king.legalMoves.length).toEqual(legalSquares.length)
            for (let i = 0; i < king.legalMoves.length; i++) {
                expect(cmpPositions(king.legalMoves[i], legalSquares[i])).toEqual(0)
            }
        });
        it("should leave king.legalMoves empty when surrounded by same color pieces", function () {
            chessBoard.populate(friends)
            king.update()

            expect(king.legalMoves.length).toEqual(0)
        });
        it("should update king.legalMoves to exactly four elements when surrounded by opposite color pieces", function () {
            chessBoard.populate(foes)
            king.update()

            expect(king.legalMoves.length).toEqual(4)
        });
    });
});
