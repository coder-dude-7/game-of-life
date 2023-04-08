import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/*import createBoard, countNeighbours, copy2dArray, makeNewBoard from './gameOfLifeFunctions.js'*/
/*import * as lifeFunctions from './gameOfLifeFunctions.js'*/
/*import App from './App';*/
import reportWebVitals from './reportWebVitals';
import Slider from '@mui/material/Slider';


class TimeSheets extends React.Component {
  constructor(props){
    super(props);
    let boardSize = 100;
    this.state = {
      columnPercentage: '',
      gridSize: boardSize,
      board: this.createBoard(boardSize),
      backgroundColor: "teal",
      cellColor: "white",
      refreshRate: 20,
      objectToPlace: "diamond",
      firstBoard: this.createBoard(boardSize)
    };
    this.createGrid = this.createGrid.bind(this);
  }

  createGrid(board) {
    var parse = require('html-react-parser');
    
    let output = ""
    for (let i = 0; i < board.length; i++){
        for(let j = 0; j < board[i].length; j++){
           output += "<div id='" + board[i][j] + "' className='box' ></div>" + "\n"
        }
    }
    output = parse(output)
    return (
      <>
          {output}
      </>
    ); 
  }
  
  
  createBoard(n) {
    let board = [];
    let row = [];
    for (let i = 0; i < n; i++){
        for (let j = 0; j < n; j++){
            row.push("zero");
        }
        board.push(row);
        row = []  
    }
    /*board = this.placeObject(board, (board.length/2), (board.length/2), "diamond");*/
    board = this.placeObject(board, (board.length/2)-6-10, (board.length/2)-6, "diamond");
    board = this.placeObject(board, (board.length/2)-6+10, (board.length/2)-6, "diamond");
    board = this.placeObject(board, (board.length/2)-6, (board.length/2)+10-6, "diamond");
    board = this.placeObject(board, (board.length/2)-6, (board.length/2)-10-6, "diamond");
    board = this.placeObject(board, (board.length/2)-6-15, (board.length/2)-15-6, "diamond");
    board = this.placeObject(board, (board.length/2)-6-15, (board.length/2)+15-6, "diamond");
    board = this.placeObject(board, (board.length/2)-6+15, (board.length/2)-15-6, "diamond");
    board = this.placeObject(board, (board.length/2)-6+15, (board.length/2)+15-6, "diamond");
    /*board = this.placeObject(board, (board.length/2)-6, (board.length/2)-6, "heavyGlider");
    board = this.placeObject(board, 0, 0, "heavyGlider");
    board = this.placeObject(board, 12, 7, "heavyGlider");*/

    return board
  }

  countNeighbours(board, x, y) {
    let count = 0;
    let length = board.length;
    let xMinus1 = x - 1;
    let yMinus1 = y - 1;

    
    if(xMinus1 < 0){
        xMinus1 = length - 1;
    }
    if(yMinus1 < 0){
        yMinus1 = length - 1;
    }
    if(xMinus1 < 0){
        xMinus1 = length - 1;
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
  copy2dArray(array){
    let outputArray = []
    for (var i = 0; i < array.length; i++)
        outputArray[i] = array[i].slice();
    return outputArray
  }
  makeNewBoard(board) {
    let count = 0;
    // copy board for manipulation
    let newBoard = this.copy2dArray(board);

    for (let i = 0; i < board.length; i++){
        for (let j = 0; j < board[i].length; j++){
            if (board[i][j] === "one") {
                count = this.countNeighbours(board, i, j);
                if (count < 2 || count > 3) {
                    newBoard[i][j] = "zero";
                }
            }
            if (board[i][j] === "zero") {
                count = this.countNeighbours(board, i, j);
                if (count === 3) {
                    newBoard[i][j] = "one";
                }
            }
        }
    }
    return newBoard  
  }

  pause() {
    clearInterval(this.interval);
    return
  }
  play() {
    clearInterval(this.interval);
    this.interval = setInterval(() => this.setState({ board: this.makeNewBoard(this.state.board) }), this.state.refreshRate);
    return
  }
  updateSpeed(speed){
    this.setState({ refreshRate: speed });
    this.pause();
    this.play();
    return
  }
  
  increaseSpeed(){
    let speed = this.state.refreshRate - 10;
    if (speed < 0){ speed = 0 } 
    this.updateSpeed(speed);
  }
  decreaseSpeed(){
    let speed = this.state.refreshRate + 10;
    if (speed > 120){ speed = 120 }
    this.updateSpeed(speed);
  }

  setGridSize(length){
    let percentage = 100/length;
    let output = "";

    for(let i = 0; i < length; i++){
        output += " " + String(percentage) + "%";
    }

    return {
      gridTemplateColumns: output,
      /*background: "white"*/
    };
  }
  updateSize(size) {
    this.pause();
    this.setState({
      gridStyle: this.setGridSize(size),
      board: this.resizeBoard(this.state.board,size)
    });
  }
  resizeBoard(board, newSize) {
    let difference = newSize - board.length;
    
      if (difference === 0){
        return board
      }
      if(difference > 0){
        // Create row of "zero"
        let row = Array(newSize).fill("zero");
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
      } else {
        difference *= -1
        for(let i = 0; i < difference; i++){
          board.pop()
          for(let j = 0; j < board.length; j++){
            board[j].pop()
            }
          }
        } 
    return board
  }

  in2dArray(arr, twoDarr){
    let count = 0
    for(let i = 0; i < twoDarr.length; i++) {
        for(let j = 0; j < arr.length; j++){
            if(arr[j] === twoDarr[i][j]){
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
  

  placeObject(board, x, y, object){  
    let objectDict = {
      "diamond": {
        "coordinates": [[x+2, y+4],[x+2, y+5],[x+2, y+6],[x+2, y+7],[x+4, y+2],[x+4, y+3],[x+4, y+4],[x+4, y+5],[x+4, y+6],[x+4, y+7],[x+4, y+8],[x+4, y+9],[x+6, y+0],[x+6, y+1],[x+6, y+2],[x+6, y+3],[x+6, y+4],[x+6, y+5],[x+6, y+6],[x+6, y+7],[x+6, y+8],[x+6, y+9],[x+6, y+10],[x+6, y+11],[x+8, y+2],[x+8, y+3],[x+8, y+4],[x+8, y+5],[x+8, y+6],[x+8, y+7],[x+8, y+8],[x+8, y+9],[x+10, y+4],[x+10, y+5],[x+10, y+6],[x+10, y+7]],
        "width": 14,
        "height": 12
      },
      "heavyGlider": {
        "coordinates":[[x+3, y+3],[x+3, y+4],[x+3, y+5],[x+3, y+6],[x+3, y+7],[x+3, y+8],[x+4, y+2],[x+4, y+8],[x+5, y+8],[x+6, y+2],[x+6, y+7],[x+7, y+4],[x+7, y+5]],
        "width":11,
        "height":9
      },

      "smallGlider": { 
        "coordinates": [[x,y],[x+1,y+1],[x+1,y+2],[x+2,y],[x+2,y+1]],
        "width":3,
        "height":3
      }
    }

    let coordinates = objectDict[object]["coordinates"]

    if (x+objectDict["diamond"]["height"] > board.length || y+objectDict["diamond"]["width"] > board[0].length) {
        return board
    }
    for (let i = x; i < x + objectDict["diamond"]["height"]; i++){
        for (let j = y; j < y + objectDict["diamond"]["width"]; j++){
            if(this.in2dArray([i,j],coordinates)){
                board[i][j] = "one";
            }else {
                board[i][j] = "zero";
            }
        }
    }
    return board
  }
  getFirstBoardSize(){
    let length = this.state.firstBoard.length;
    console.log("lenght:", length)
    return length
  }
  reset() {
    this.pause()
    console.log(this.state.gridSize)
    this.setGridSize(this.getFirstBoardSize());
    this.setState({
      board: this.state.firstBoard,
    });
    console.log(this.state.gridSize)
    
  }
  
  componentDidMount() {
    this.setState({
      gridStyle: this.setGridSize(this.state.gridSize)
    });
    /*this.interval = setInterval(() => this.setState({ board: this.makeNewBoard(this.state.board) }), this.state.refreshRate);*/
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    const gridStyle = this.state.gridStyle;
    const handleChangeSpeed = (event, newValue) => {
      this.updateSpeed(200 - newValue);
    };
    const handleChangeSize = (event, newValue) => {
      this.updateSize(newValue);
    };
    
    return (
      <div className="page">
        <div style={gridStyle} className="gridHolder">
          {this.createGrid(this.state.board)} 
        </div>
        <div className="controls">

          {/*<button id="increaseSpeed" onClick={() => this.increaseSpeed()} className="button">+</button>
          <button id="decreaseSpeed" onClick={() => this.decreaseSpeed()} className="button">-</button>*/}

          <Slider 
            defaultValue={200-this.state.refreshRate} 
            aria-label="Speed" 
            valueLabelDisplay="auto"
            
            onChange={handleChangeSpeed}
            size="small"
            min={0}
            max={200}  
          />
          <button id="playButton" onClick={() => this.play()} className="playButton"></button>
          <button id="pauseButton" onClick={() => this.pause()} className="pauseButton"></button>
          <Slider 
            defaultValue={this.state.gridSize} 
            aria-label="Speed" 
            valueLabelDisplay="auto"
            onChange={handleChangeSize}
            min={10}
            max={120}  
          />
          
          
        </div>
        <button id="resetButton" className="resetButton" onClick={() => this.reset()}> RESET </button>
      </div>
    );
  }
}

ReactDOM.render(
  <TimeSheets />,
  document.getElementById('root')
);

/*ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
