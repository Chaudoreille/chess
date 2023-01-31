describe('utility', function() {
    describe('cmpPositions function', () => {
            const lowerPosition = {x: 0, y:0}
            const higherXPosition = {x: 1, y:0}
            const higherYPosition = {x: 0, y:1}
            
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

    describe('pushIfInBounds function', () => {
        let container, position

        beforeEach(() => {
            container = []
        });
        it('should be declared', () => {
            expect(typeof pushIfInBounds).toBe('function');
        });
        it('should not push position in container if position is out of bounds', () => {
            position = mockSquare(-1, 7)
            pushIfInBounds(container, position);
            expect(container.length).toEqual(0)

            position = mockSquare(8, 0)
            pushIfInBounds(container, position);
            expect(container.length).toEqual(0)

            position = mockSquare(7, -1)
            pushIfInBounds(container, position);
            expect(container.length).toEqual(0)

            position = mockSquare(0, 8)
            pushIfInBounds(container, position);
            expect(container.length).toEqual(0)
        });
        it('should push position in container if position is within bounds', () => {
            position = mockSquare(0,7)
            pushIfInBounds(container, position);
            expect(container[0]).toEqual(position)

            position = mockSquare(7,0)
            pushIfInBounds(container, position);
            expect(container[container.length-1]).toEqual(position)
        });
    });

});  