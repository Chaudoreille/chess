describe('ChessBoard', function() {
    beforeEach(() => {
    });

    it('should be declared', () => {
        expect(typeof ChessBoard).toBe('function');
    });
    
    describe('constructor method', () => {
        it('should create a pieces object property containing an array for each color', () => {
            const chess = new ChessBoard()
            expect(chess.pieces[WHITE]).toEqual([])
            expect(chess.pieces[BLACK]).toEqual([])
        });
        it('should create a kings object property, with each color set to null', () => {
            const chess = new ChessBoard()
            expect(chess.kings[WHITE]).toEqual(null)
            expect(chess.kings[BLACK]).toEqual(null)
        });
        it('should create a turn property set to WHITE', () => {
            const chess = new ChessBoard()
            expect(chess.turn).toEqual(WHITE)
        });
        it('should create a board property set to a null-filled 8*8 matrix', () => {
            const chess = new ChessBoard()
            expect(chess.collisions.length).toEqual(8)

            chess.collisions.forEach(column => {
                expect(column.length).toEqual(8)
                column.forEach((square) => expect(square).toBe(null))
            })
        });
    });
});  