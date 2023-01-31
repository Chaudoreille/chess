function cmpPositions(a, b) {
    if (a.x === b.x) {
        return a.y - b.y
    }
    return a.x - b.x
}


/**
 * ## checks if a x,y position is within board bounds
 * @param {Number} x 
 * @param {Number} y 
 * @returns 
 */
function inBounds(x, y) {
    if (x < 0 || x > 7 ||
        y < 0 || y > 7) {
        return false
    }
    return true
}

function pushIfInBounds(container, position) {
    if (inBounds(position.x, position.y)) {
        container.push(position)
    }
}