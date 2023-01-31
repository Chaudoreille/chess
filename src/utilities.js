function cmpPositions(a, b) {
    if (a.x === b.x) {
        return a.y - b.y
    }
    return a.x - b.x
}

function pushIfInBounds(container, position) {
    if (position.x >= 0 && position.x < 8 && 
        position.y >= 0 && position.y < 8) {
        container.push(position)
    }
}