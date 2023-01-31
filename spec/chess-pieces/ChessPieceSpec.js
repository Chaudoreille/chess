let chessBoard, chessPiece, friend, foe
const  position = mockSquare(1, 2, "B3")
const positionFriend = mockSquare(0, 2, "A3")
const positionFoe = mockSquare(1, 3, "B4")
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

        it("should throw an error when the piece can't move to the new position", function() {
            let position2 = mockSquare(2, 2, "F3")
            expect(() => chessPiece.move(position2)).toThrow()
        });

        it("should throw an error when the piece tries to take a piece of the same color.", function() {
        });

        it("should move the piece on the chessBoard", function () {
        });

        it("should return the taken piece when it moves to a square occupied by an opposing piece", function() {
        });
    });

    describe('pushMoveIfLegal method', () => {
        it("should be declared", function() {
            expect(typeof chessPiece.move).toEqual("function")
        });

        it(`should return true and push the move in legalMoves
            when there is no chess piece on the destination square`, function () {
        });

        it(`should return false and not push the move in legalMoves
            when there is a piece of the same color on the destination square`, function() {
        });

        it(`should return false and push the move in legalMoves
            when there is a chess piece of the opposing color on the destination square`, function() {
        });
    });
});  