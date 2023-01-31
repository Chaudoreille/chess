describe('Square', function() {
    it('should be declared', () => {
        expect(typeof Square).toBe('function')
    })
    
    describe('constructor method', () => {
        it('should receive two integers : `x` and `y` as a parameter and store them in it\'s own properties', () => {
            const square = new Square(1,5)
            expect(square.x).toBe(1)
            expect(square.y).toBe(5)
        })

        it('should create a name property with the correct chess square name', () => {
            const firstSquare = new Square(0,0)
            const lastSquare = new Square(7,7)
            expect(firstSquare.name).toBe("A1")
            expect(lastSquare.name).toBe("H8")
        })

        it('should throw an error when creating a square out of bounds', () => {
            expect(()=> new Square(0,7)).not.toThrow()
            expect(()=> new Square(7,0)).not.toThrow()
            expect(() => new Square(-1, 3)).toThrow()
            expect(() => new Square(0, -1)).toThrow()
            expect(() => new Square(0, 8)).toThrow()
            expect(() => new Square(8, 0)).toThrow()
        })

        it('should be immutable', () => {
            const square = new Square(0,0)
            square.x = 23
            square.y = 23
            square.name = ""
            expect(square).toEqual(new Square(0,0))
        })
    })
})  