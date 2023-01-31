describe('utility', function() {
    const lowerPosition = {x: 0, y:0}
    const higherXPosition = {x: 1, y:0}
    const higherYPosition = {x: 0, y:1}
    
        describe('cmpPositions function', () => {
        it('should be declared', () => {
            expect(typeof cmpPositions).toBe('function');
        });
        it('should return 0 when a.x == b.y and a.x == b.x', () => {
            expect(cmpPositions(lowerPosition, lowerPosition)).toEqual(0)
        });
        it('should return a negative number when a.x < b.x', () => {
            expect(cmpPositions(lowerPosition, higherXPosition) < 0).toEqual(true)
        });
        it('should return a positive number when a.x > b.x', () => {
            expect(cmpPositions(higherXPosition, lowerPosition) > 0).toEqual(true)
        });
        it('should return a positive number when a.x > b.x and a.y < b.y', () => {
            expect(cmpPositions(higherXPosition, higherYPosition) > 0).toEqual(true)
        });
        it('should return a negative number when a.y < b.y and a.x == b.x', () => {
            expect(cmpPositions(lowerPosition, higherYPosition) < 0).toEqual(true)
        });
        it('should return a positive number when a.y > b.y and a.x == b.x', () => {
            expect(cmpPositions(higherYPosition, lowerPosition) > 0).toEqual(true)
        });
    });
});  