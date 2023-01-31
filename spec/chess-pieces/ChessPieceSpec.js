let chessBoard, chessPiece, friend, foe
const  position = mockSquare(1, 2, "B3")
const positionFriend = mockSquare(0, 2, "A3")
const positionFoe = mockSquare(1, 3, "B4")
const positionFree = mockSquare(7,7,"H8")
const color = BLACK
const opposingColor = WHITE

describe('ChessPiece', function() {
    beforeEach(() => {
        chessBoard = mockChessBoard()
        chessPiece = new ChessPiece(chessBoard, color, position)
        friend = new ChessPiece(chessBoard, color, positionFriend)
        foe = new ChessPiece(chessBoard, opposingColor, positionFoe)
        chessBoard.populate([chessPiece, friend, foe])
    });

    it('should be declared', () => {
        expect(typeof ChessPiece).toBe('function');
    });
    
    describe('constructor method', () => {
        it('should receive `chessBoard`, `color` and `square` as a parameter and store them in it\'s own properties', () => {
            expect(chessPiece.board).toBe(chessBoard);
            expect(chessPiece.color).toBe(color);
            expect(chessPiece.pos).toBe(position);
        });
    });

    describe('targets method', () => {
        it("should be declared", function() {
            expect(typeof chessPiece.targets).toEqual("function")
        });
        it("should return false", function() {
            expect(chessPiece.targets(foe)).toEqual(false)
        });
    });

    describe('move method', () => {
        it("should be declared", function() {
            expect(typeof chessPiece.move).toEqual("function")
        });

        it("should throw an <Illegal Move> when the destination is not in legalMoves", function() {
            expect(() => chessPiece.move(positionFree)).toThrow(new Error("Illegal Move"))
        });

        it("should throw a <Friendly Fire></friendly> error when the piece tries to take a piece of the same color.", function() {
            chessPiece.legalMoves.push(friend.pos)
            expect(() => chessPiece.move(friend.pos)).toThrow(new Error("Friendly Fire"))
        });

        it(`should move the piece on the chessBoard
            when move is legal and destination square is empty`, function () {
            chessPiece.legalMoves.push(positionFree)
            let taken = chessPiece.move(positionFree)

            expect(chessPiece.pos).toBe(positionFree)
            expect(chessPiece.board.collisions[positionFree.x][positionFree.y])
            .toBe(chessPiece)
            expect(taken).toEqual(false)
        });

        it("should return the taken piece when it moves to a square occupied by an opposing piece", function() {
            chessPiece.legalMoves.push(foe.pos)
            let taken = chessPiece.move(foe.pos)

            expect(chessPiece.pos).toBe(foe.pos)
            expect(chessPiece.board.collisions[foe.pos.x][foe.pos.y])
            .toBe(chessPiece)
            expect(taken).toBe(foe)
        });
    });

    describe('legalBoardSpace method', () => {
        it("should be declared", function() {
            expect(typeof chessPiece.move).toEqual("function")
        });

        it(`should return true and push the move in legalMoves
        when there is no chess piece on the destination square`, function () {
            let ret = chessPiece.legalBoardSpace(positionFree.x, positionFree.y)
            expect(ret).toBe(true)
            expect(chessPiece.legalMoves[0].x).toEqual(positionFree.x)
            expect(chessPiece.legalMoves[0].y).toEqual(positionFree.y)
            expect(chessPiece.legalMoves[0].name).toEqual(positionFree.name)
        });

        it(`should return false and push the move in legalMoves
        when there is a chess piece of the opposing color on the destination square`, function() {
            let ret = chessPiece.legalBoardSpace(positionFoe.x, positionFoe.y)
            expect(ret).toBe(false)
            expect(chessPiece.legalMoves[0].x).toEqual(positionFoe.x)
            expect(chessPiece.legalMoves[0].y).toEqual(positionFoe.y)
            expect(chessPiece.legalMoves[0].name).toEqual(positionFoe.name)
        });

        it(`should return false and not push the move in legalMoves
        when there is a piece of the same color on the destination square`, function() {
            let ret = chessPiece.legalBoardSpace(positionFriend.x, positionFriend.y)
            expect(ret).toBe(false)
            expect(chessPiece.legalMoves).toEqual([])
        });
    });
});  