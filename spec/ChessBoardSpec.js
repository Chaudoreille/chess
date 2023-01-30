describe('ChessBoard', function() {
    beforeEach(() => {
    });

    it('should be declared', () => {
        expect(typeof ChessBoard).toBe('function');
    });
    
    describe('constructor method', () => {
        it('should create a whitePieces property, initialized to an empty array', () => {
            const chess = new ChessBoard()
            expect(chess.whitePieces).toEqual([])
        });
        it('should create a blackPieces property, initialized to an empty array', () => {
            const chess = new ChessBoard()
            expect(chess.blackPieces).toEqual([])
        });
        it('should create a turn property set to false', () => {
            const chess = new ChessBoard()
            expect(chess.turn).toBe(false)
        });
        it('should create a board property set to a null-filled 8*8 matrix', () => {
            const chess = new ChessBoard()
            expect(chess.board.length).toEqual(8)

            chess.board.forEach(column => {
                expect(column.length).toEqual(8)
                column.forEach((square) => expect(square).toBe(null))
            })
        });
    });
});  