let chessBoard, chessPiece, position;

describe('ChessPiece', function() {
    beforeEach(() => {
        chessBoard = {};
        position1 = {x: 1, y: 2, name: "F2"}
        position2 = {x: 2, y: 2, name: "F3"}
        chessPiece = new ChessPiece(chessBoard, position1)
    });

    it('should be declared', () => {
        expect(typeof ChessPiece).toBe('function');
    });
    
    describe('constructor method', () => {
        it('should receive `chessBoard` and `square` as a parameter and store them in it\'s own properties', () => {
            expect(chessPiece.board).toBe(chessBoard);
            expect(chessPiece.pos).toBe(position1);
        });
    });

    describe('legalMoves method', () => {
        it("should return a an empty array", function() {
            expect(chessPiece.legalMoves()).toEqual([])
        });
    });

    describe('move method', () => {
        it("should update the piece's position to the new one", function() {
            chessPiece.move(position2);
            expect(chessPiece.pos).toEqual(position2)
        });
    });
});  