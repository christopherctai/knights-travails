let gameboard = []; 
for (i = 0; i < 8; i++) {
    for (j = 0; j < 8; j++) {
        gameboard.push([i, j]); 
    }
}

let knight; 


const knightMoves = (start, end) => {
    // tree 
    const buildTree = (start, gameboard) => {
        // find possible moves 

    }

    buildTree(start, gameboard); 
} 

console.log((1, 2) + (-3, 4))


// building the tree 

/* 
The possible moves if a knight is at the center of a chessboard for instance (3, 3) are 8: 
1) (+1, +2) -> (4, 5)
2) (+2, +1) -> (5, 4) 
3) (+2, -1) -> (5, 2)
4) (+1, -2) -> (4, 1)
5) (-1, -2) -> (2, 1)
6) (-2, -1) -> (1, 2)
7) (-2, +1) -> (1, 4)
8) (-1, +2) -> (2, 5) 

Make an array of the possible moves (which are always consistent): 

let  = [(+1, +2), (+2, +1), (+2, -1), (+1, -2), (-1, -2), (-2, -1), (-2, +1), (-1, +2)];

Every coordinate move also needs to have another list of possible moves that could be made.
So maybe we make each coordinate object based: 

const Coordinate = (x, y, possibleMoves = null) {
    return {
        x: x, 
        y: y, 
        possibleMoves: possibleMoves
    }
}


Where possibleMoves is an array of other coordinates that also have an x, y, and possibleMoves array.  

Then, take the starting coordinate and add it with the array to get a list of possible moves 
We need to check to see if the moves land on the board though. We can either do that after, or during. Let's try during: 

const findImmediateMoves = (startCoordinate) {
    let moves = [[+1, +2], [+2, +1], [+2, -1], [+1, -2], [-1, -2], [-2, -1], [-2, +1], [-1, +2]];

    for (i = 0; i < 8; i++) {
        let endCoordinate = Coordinate(startCoordinate.x + moves[i][0], startCoordinate.y + moves[i][1])
        if (endCoordinate.x > 7 || endCoordinate.x < 0 || endCoordinate.y > 7 || endCoordinate.y < 0) {
            endCoordinate = null; 
        } 
        startCoordinate.possibleMoves.push(endCoordinate); 
    }
}






*/