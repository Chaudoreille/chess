let chessBoard, chessPiece, position

describe('ChessPiece', function() {
    beforeEach(() => {
        chessBoard = mockChessBoard();
        position = mockSquare(1, 2, "F2")
        chessPiece = new ChessPiece(chessBoard, WHITE, position)
    });

    it('should be declared', () => {
        expect(typeof ChessPiece).toBe('function');
    });
    
    describe('constructor method', () => {
        it('should receive `chessBoard` and `square` as a parameter and store them in it\'s own properties', () => {
            console.log(position, chessPiece.pos)
            expect(chessPiece.board).toBe(chessBoard);
            expect(chessPiece.pos).toBe(position);
        });
    });

    describe('targets method', () => {
        it("should return false", function() {
            let otherPiece = new ChessPiece()
            expect(chessPiece.targets(otherPiece)).toEqual(false)
        });
    });

    describe('move method', () => {
        it("should throw an Illegal Move error if the piece can't move to the new position", function() {
            let position2 = mockSquare(2, 2, "F3")
            expect(() => chessPiece.move(position2)).toThrow()
        });
    });
});  