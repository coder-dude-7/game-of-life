function createBoard(n) {
    let board = [];
    let row = [];
    for (let i = 0; i < n; i++){
        for (let j = 0; j < n; j++){
            row.push("zero");
        }
        board.push(row);
        row = []  
    }
    return board
}

function countNeighbours(board, x, y) {
    let count = 0;
    let length = board.length
    let xMinus1 = x - 1
    let yMinus1 = y - 1


    if(xMinus1 < 0){
        xMinus1 = length - 1
    }
    if(yMinus1 < 0){
        yMinus1 = length - 1
    }
    if(xMinus1 < 0){
        xMinus1 = length - 1
    }
    if (board[(x)%length][(yMinus1)] === "one") {
        count += 1;
    }
    if (board[(x)%length][(y+1)%length] === "one") {
        count += 1;
    }
    if (board[(xMinus1)%length][(y)%length] === "one") {
        count += 1;
    }
    if (board[(x+1)%length][(y)%length] === "one") {
        count += 1;
    }
    if (board[(xMinus1)][(yMinus1)] === "one") {
        count += 1;
    }
    if (board[(x+1)%length][(y+1)%length] === "one") {
        count += 1;
    }
    if (board[(xMinus1)][(y+1)%length] === "one") {
        count += 1;
    }
    if (board[(x+1)%length][(yMinus1)] === "one") {
        count += 1;
    }


    return count
}
function copy2dArray(array){
    let outputArray = []
    for (var i = 0; i < array.length; i++)
        outputArray[i] = array[i].slice();
    return outputArray
}
function makeNewBoard(board) {
    let count = 0;
    // copy board for manipulation
    let newBoard = copy2dArray(board);

    for (let i = 0; i < board.length; i++){
        for (let j = 0; j < board[i].length; j++){
            if (board[i][j] === "one") {
                count = countNeighbours(board, i, j);
                if (count < 2 || count > 3) {
                    newBoard[i][j] = "zero";
                }
            }
            if (board[i][j] === "zero") {
                count = countNeighbours(board, i, j);
                if (count === 3) {
                    newBoard[i][j] = "one";
                }
            }
        }
    }

    return newBoard
    
}

function getGridSize(board){
    let length = board.length;
    let percentage = 100/length;
    let output = "grid-template-columns: ";

    for(let i = 0; i < length; i++){
        output += " " + String(percentage) + "%";
    }
    output += ";";
    return output;
}


function resizeBoard(board, newSize) {
    /*newBoard = copy2dArray(board)*/
    let difference = newSize - board.length;
    let addOn = [];
    let row = [];
    // Create row of "zero"
    for(let i = 0; i < newSize; i++){
        row.push("zero");
    }
    // add "zero"s to existing rows (y-axis)
    for (let i = 0; i < board.length; i++){
        for (let j = 0; j < difference; j++){
            board[i].push("zero");
        }
    }
    // add "zero" rows (x-axis)
    for (let i = 0; i < difference; i++){
        board.push(row)
    }
    return board
}

function in2dArray(arr, twoDarr){
    let count = 0
    for(let i = 0; i < twoDarr.length; i++) {
        for(let j = 0; j < arr.length; j++){
            if(arr[j] == twoDarr[i][j]){
                count += 1
                if (count > 1){
                    return true
                }
            } else{
                count = 0 
                break
            }
        }
    }
    return false
}



function makeHeavyGlider(board, x, y) {
    
    if (x+9 > board.length || y+11 > board[0].length) {
        return false
    }
    
    let row = []
    let arr = []
    let coordinates = [
        [3,3],       
        [3,4],    
        [3,5],    
        [3,6],    
        [3,7],    
        [3,8],    
        [4,2],
        [4,8],
        [5,8],
        [6,2],
        [6,7],
        [7,4],
        [7,5]
    ]
    /*console.log(in2dArray([7,5],coordinates))
    console.log(coordinates);*/
    
    for (let i = x; i < x + 9; i++){
        for (let j = y; j < y + 11; j++){
            if(in2dArray([i,j],coordinates)){
                board[i][j] = "one";
                /*row.push("one")*/
            }else {
                /*row.push("zero")*/
                board[i][j] = "zero";
            }
        }
        /*arr.push(row)*/
    }
    /*console.log(arr)*/
    return board
}

// DIAMOND (10x13)
/*board[36][38] = "one"
board[36][39] = "one"
board[36][40] = "one"
board[36][41] = "one"

board[38][36] = "one"   
board[38][37] = "one"
board[38][38] = "one"
board[38][39] = "one"
board[38][40] = "one"
board[38][41] = "one"
board[38][42] = "one"
board[38][43] = "one"

board[40][34] = "one"
board[40][35] = "one"
board[40][36] = "one"   
board[40][37] = "one"
board[40][38] = "one"
board[40][39] = "one"
board[40][40] = "one"
board[40][41] = "one"
board[40][42] = "one"
board[40][43] = "one"
board[40][44] = "one"
board[40][45] = "one"

board[42][36] = "one"   
board[42][37] = "one"
board[42][38] = "one"
board[42][39] = "one"
board[42][40] = "one"
board[42][41] = "one"
board[42][42] = "one"
board[42][43] = "one"

board[44][38] = "one"
board[44][39] = "one"
board[44][40] = "one"
board[44][41] = "one"*/

function makeDiamond(board, x, y) {
    if (x+12 > board.length || y+14 > board[0].length) {
        return board
    }
    
    let row = []
    let arr = []
    let coordinates = [
        [x+2, y+4],       
        [x+2, y+5],    
        [x+2, y+6],    
        [x+2, y+7],

        [x+4, y+2],    
        [x+4, y+3],    
        [x+4, y+4],
        [x+4, y+5],
        [x+4, y+6],
        [x+4, y+7],
        [x+4, y+8],
        [x+4, y+9],

        [x+6, y+0],    
        [x+6, y+1],    
        [x+6, y+2],
        [x+6, y+3],
        [x+6, y+4],
        [x+6, y+5],
        [x+6, y+6],
        [x+6, y+7],
        [x+6, y+8],
        [x+6, y+9],
        [x+6, y+10],
        [x+6, y+11],

        [x+8, y+2],    
        [x+8, y+3],    
        [x+8, y+4],
        [x+8, y+5],
        [x+8, y+6],
        [x+8, y+7],
        [x+8, y+8],
        [x+8, y+9],

        [x+10, y+4],       
        [x+10, y+5],    
        [x+10, y+6],    
        [x+10, y+7]
    ]
    /*console.log(in2dArray([7,5],coordinates))
    console.log(coordinates);*/
    for (let i = x; i < x + 11; i++){
        for (let j = y; j < y + 13; j++){
            if(this.in2dArray([i,j],coordinates)){
                board[i][j] = "one";
                /*row.push("one")*/
            }else {
                /*row.push("zero")*/
                board[i][j] = "zero";
            }
        }
        /*arr.push(row)*/
    }
    /*console.log(arr)*/
    return board
  }




let ass = createBoard(20)
console.log(makeHeavyGlider(ass, 0,0))

/*console.log(ass)*/
/*console.log(resizeBoard(ass, 6))*/
/*console.log(-1%5)*/
/*console.log(ass[0][0])*/
/*console.log(countNeighbours(ass,0,0))*/
/*console.log(getGridSize(ass))*/