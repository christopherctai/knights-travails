const path = require("path");
const util = require("util");


let gameboard = []; 
for (i = 0; i < 8; i++) {
    for (j = 0; j < 8; j++) {
        gameboard.push([i, j]); 
    }
}

let knight; 
let moves = [[+1, +2], [+2, +1], [+2, -1], [+1, -2], [-1, -2], [-2, -1], [-2, +1], [-1, +2]];


const knightMoves = (start, end) => {
    
} 

const Coordinate = (x, y, possibleMoves = []) => {
    return {
        x: x, 
        y: y, 
        possibleMoves: possibleMoves
    }
}  


const findImmediateMoves = (startCoordinate) => {
    for (i = 0; i < 8; i++) {
        let endCoordinate = Coordinate(startCoordinate.x + moves[i][0], startCoordinate.y + moves[i][1]);
        if (endCoordinate.x > 7 || endCoordinate.x < 0 || endCoordinate.y > 7 || endCoordinate.y < 0) {
            endCoordinate = null; 
        } 
        startCoordinate.possibleMoves.push(endCoordinate); 
    }
} 


const buildTree = (startCoordinate, repeats = 5) => {  
    if (startCoordinate === null) return;  
    if (repeats === 0) return;
    findImmediateMoves(startCoordinate);
    repeats--;
    buildTree(startCoordinate.possibleMoves[0], repeats); 
    buildTree(startCoordinate.possibleMoves[1], repeats); 
    buildTree(startCoordinate.possibleMoves[2], repeats); 
    buildTree(startCoordinate.possibleMoves[3], repeats); 
    buildTree(startCoordinate.possibleMoves[4], repeats); 
    buildTree(startCoordinate.possibleMoves[5], repeats); 
    buildTree(startCoordinate.possibleMoves[6], repeats); 
    buildTree(startCoordinate.possibleMoves[7], repeats); 
} 

const findClosestEndCoordinate = (startCoordinate, endCoordinate) => {
    let queue = []; 
    queue.push(startCoordinate); 
    while (queue.length !== 0) { 
        let front = queue[0]; 
        if (front.x === endCoordinate.x && front.y === endCoordinate.y) return front;
        if (front.possibleMoves[0] !== null) queue.push(front.possibleMoves[0]);
        if (front.possibleMoves[1] !== null) queue.push(front.possibleMoves[1]);
        if (front.possibleMoves[2] !== null) queue.push(front.possibleMoves[2]);
        if (front.possibleMoves[3] !== null) queue.push(front.possibleMoves[3]);
        if (front.possibleMoves[4] !== null) queue.push(front.possibleMoves[4]);
        if (front.possibleMoves[5] !== null) queue.push(front.possibleMoves[5]);
        if (front.possibleMoves[6] !== null) queue.push(front.possibleMoves[6]);
        if (front.possibleMoves[7] !== null) queue.push(front.possibleMoves[7]);
        queue.shift();
    }  
    return 
}  


const findPath = (startCoordinate, endCoordinate, path = []) => {  
    if (startCoordinate === null || startCoordinate === undefined) return; 
    if (startCoordinate.possibleMoves === []) return;
    if (startCoordinate === endCoordinate) {
        path.push(endCoordinate); 
        console.log(path); 
        return path;
    } 
    path.push(startCoordinate);  
    findPath(startCoordinate.possibleMoves[0], endCoordinate, path)
    findPath(startCoordinate.possibleMoves[1], endCoordinate, path)
    findPath(startCoordinate.possibleMoves[2], endCoordinate, path)
    findPath(startCoordinate.possibleMoves[3], endCoordinate, path)
    findPath(startCoordinate.possibleMoves[4], endCoordinate, path)
    findPath(startCoordinate.possibleMoves[5], endCoordinate, path)
    findPath(startCoordinate.possibleMoves[6], endCoordinate, path)
    findPath(startCoordinate.possibleMoves[7], endCoordinate, path)

}

/*if ()
let testCoord = Coordinate(0, 0);
findImmediateMoves(testCoord); 
console.log(util.inspect(testCoord, false, null, true)); 
*/  

let testCoord = Coordinate(4, 4);
buildTree(testCoord); 
let endCoord = Coordinate(5, 5);  
endCoord = findClosestEndCoordinate(testCoord, endCoord); 
console.log(findPath(testCoord, endCoord)); 




//console.log(util.inspect(testCoord, false, null, true)); 

/* 


BUILDING THE TREE 



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

const Coordinate = (x, y, possibleMoves = null) => {
    return {
        x: x, 
        y: y, 
        possibleMoves: possibleMoves
    }
}


Where possibleMoves is an array of other coordinates that also have an x, y, and possibleMoves array.  

Then, take the starting coordinate and add it with the array to get a list of possible moves 
We need to check to see if the moves land on the board though. We can either do that after, or during. Let's try during: 

const findImmediateMoves = (startCoordinate) => {
    let moves = [[+1, +2], [+2, +1], [+2, -1], [+1, -2], [-1, -2], [-2, -1], [-2, +1], [-1, +2]];

    for (i = 0; i < 8; i++) {
        let endCoordinate = Coordinate(startCoordinate.x + moves[i][0], startCoordinate.y + moves[i][1])
        if (endCoordinate.x > 7 || endCoordinate.x < 0 || endCoordinate.y > 7 || endCoordinate.y < 0) {
            endCoordinate = null; 
        } 
        startCoordinate.possibleMoves.push(endCoordinate); 
    }
}

We should probably make this tree like 64 times, just so we cover the whole board. 


SEARCHING THE TREE 

how do we search this thing to find the right answer?? 

We do the same process for every branch of the tree: 
1) Go down to one of the possible moves 
2) See if that move is correct, desired coordinate. 
    if it is, then we have found our shortest route 
    if it is not, then move on to the next possible move 
3) If none of those possible moves are correct, then we go to the NEXT set of possible moves from the first possible move. 
    this is a queue. FIFO. Breadth first approach. Level order. 
4) continue until we have found the desired coordinate to land on, then print out the steps it takes to get there. 




*/