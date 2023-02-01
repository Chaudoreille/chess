describe('Pawn', function() {
    let position = mockSquare(2,2)
    const color = BLACK
    const opposingColor = WHITE
    const direction = Direction.UP
    let chessBoard, friends, foes, pawn

    beforeEach(() => {
        chessBoard = mockChessBoard()
        pawn = new Pawn(chessBoard, color, position, direction)
        console.log(pawn)
        chessBoard.populate([pawn])
        friends = [
            new Pawn(chessBoard, color, mockSquare(pawn.pos.x, pawn.pos.y+1), direction),
        ]
        foes = [
            new Pawn(chessBoard, opposingColor, mockSquare(pawn.pos.x, pawn.pos.y+1), -direction),
        ]
    });

    it('should be declared', () => {
        expect(typeof Pawn).toBe('function');
    });

    describe('targets method', () => {
        it("should be declared", function() {
            expect(typeof pawn.targets).toEqual("function")
        });
        it("should return true when chessPiece's position is in bishop's legal moves", function() {
        });

        it("should return false when chessPiece's position is not in bishop's legal moves", function() {
        });
    });

    describe('update method', () => {
        it("should be declared", function() {
            expect(typeof pawn.update).toEqual("function")
        });

        it("should update pawn.legalMoves with single square on an empty board", function () {
            pawn.update()
            let legalSquares = [
                mockSquare(pawn.x, pawn.y + pawn.direction)
            ]

            expect(pawn.legalMoves.length).toEqual(2)

            expect(cmpPositions(pawn.legalMoves[0], legalSquares[0])).toEqual(0)
            expect(cmpPositions(pawn.legalMoves[1], legalSquares[1])).toEqual(0)
        });
        
        it(`should update pawn.legalMoves with two squares
        when on it's starting position on an empty board`, function () {
            let starterPawn = new Pawn(pawn.chessBoard, WHITE, mockSquare(6,1), Direction.UP)
            pawn.update()

            let legalSquares = [
                mockSquare(pawn.x, pawn.y + pawn.direction),
                mockSquare(pawn.x, pawn.y + pawn.direction * 2)
            ]

            expect(pawn.legalMoves.length).toEqual(2)

            expect(cmpPositions(pawn.legalMoves[0], legalSquares[0])).toEqual(0)
            expect(cmpPositions(pawn.legalMoves[1], legalSquares[1])).toEqual(0)
        });

        it("should update pawn.legalMoves with a different square when changing it's direction", function () {
            pawn.update()
            let legalSquares = [
                mockSquare(pawn.x, pawn.y + pawn.direction)
            ]

            expect(pawn.legalMoves.length).toEqual(2)

            expect(cmpPositions(pawn.legalMoves[0], legalSquares[0])).toEqual(0)
            expect(cmpPositions(pawn.legalMoves[1], legalSquares[1])).toEqual(0)
        });

        it("should leave pawn.legalMoves empty when behind a same color piece", function () {
            chessBoard.populate(friends)
            pawn.update()

            expect(pawn.legalMoves.length).toEqual(0)
        });
        it("should leave pawn.legalMoves empty when in front of an opposing color piece", function () {
            chessBoard.populate(foes)
            pawn.update()

            expect(pawn.legalMoves.length).toEqual(0)
        });
    });
});
