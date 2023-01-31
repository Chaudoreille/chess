describe('Knight', function() {
    let position = mockSquare(2,2,"B3")
    const color = BLACK
    const opposingColor = WHITE
    let chessBoard, friends, foes, knight

    beforeEach(() => {
        chessBoard = mockChessBoard()
        knight = new Knight(chessBoard, color, position)
        chessBoard.populate([knight])
        friends = [
            new Knight(chessBoard, color, mockSquare(knight.pos.x-2, knight.pos.y+1)),
            new Knight(chessBoard, color, mockSquare(knight.pos.x-2, knight.pos.y-1)),
            new Knight(chessBoard, color, mockSquare(knight.pos.x-1, knight.pos.y-2)),
            new Knight(chessBoard, color, mockSquare(knight.pos.x-1, knight.pos.y+2)),
            new Knight(chessBoard, color, mockSquare(knight.pos.x+1, knight.pos.y-2)),
            new Knight(chessBoard, color, mockSquare(knight.pos.x+1, knight.pos.y+2)),
            new Knight(chessBoard, color, mockSquare(knight.pos.x+2, knight.pos.y-1)),
            new Knight(chessBoard, color, mockSquare(knight.pos.x+2, knight.pos.y+1))
        ]
        foes = [
            new Knight(chessBoard, opposingColor, mockSquare(knight.pos.x-2, knight.pos.y+1)),
            new Knight(chessBoard, opposingColor, mockSquare(knight.pos.x-2, knight.pos.y-1)),
            new Knight(chessBoard, opposingColor, mockSquare(knight.pos.x-1, knight.pos.y-2)),
            new Knight(chessBoard, opposingColor, mockSquare(knight.pos.x-1, knight.pos.y+2)),
            new Knight(chessBoard, opposingColor, mockSquare(knight.pos.x+1, knight.pos.y-2)),
            new Knight(chessBoard, opposingColor, mockSquare(knight.pos.x+1, knight.pos.y+2)),
            new Knight(chessBoard, opposingColor, mockSquare(knight.pos.x+2, knight.pos.y-1)),
            new Knight(chessBoard, opposingColor, mockSquare(knight.pos.x+2, knight.pos.y+1))
        ]
    });

    it('should be declared', () => {
        expect(typeof Knight).toBe('function');
    });

    describe('targets method', () => {
        it("should be declared", function() {
            expect(typeof knight.targets).toEqual("function")
        });
        it("should return false", function() {
            expect(knight.targets(foes[0])).toEqual(false)
        });
    });

    describe('updateLegalMoves method', () => {
        it("should be declared", function() {
            expect(typeof knight.updateLegalMoves).toEqual("function")
        });

        it("should update knight.legalMoves with a complete row and column on an empty board", function () {
            knight.updateLegalMoves()
            let legalSquares = [
                mockSquare(knight.pos.x-2, knight.pos.y+1),
                mockSquare(knight.pos.x-2, knight.pos.y-1),
                mockSquare(knight.pos.x-1, knight.pos.y-2),
                mockSquare(knight.pos.x-1, knight.pos.y+2),
                mockSquare(knight.pos.x+1, knight.pos.y-2),
                mockSquare(knight.pos.x+1, knight.pos.y+2),
                mockSquare(knight.pos.x+2, knight.pos.y-1),
                mockSquare(knight.pos.x+2, knight.pos.y+1)
            ]

            knight.legalMoves.sort(cmpPositions)

            expect(knight.legalMoves.length).toEqual(legalSquares.length)
            for (let i = 0; i < knight.legalMoves.length; i++) {
                expect(cmpPositions(knight.legalMoves[i], legalSquares[i])).toEqual(0)
            }
        });
        it("should leave knight.legalMoves empty when surrounded by same color pieces", function () {
            chessBoard.populate(friends)
            knight.updateLegalMoves()

            expect(knight.legalMoves.length).toEqual(0)
        });
        it("should update knight.legalMoves to exactly four elements when surrounded by opposite color pieces", function () {
            chessBoard.populate(foes)
            knight.updateLegalMoves()

            expect(knight.legalMoves.length).toEqual(4)
        });
    });
});
