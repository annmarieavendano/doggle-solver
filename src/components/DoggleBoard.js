import React from 'react';
import logo from '../images/logo.png';
import './DoggleBoard.css';
import DoggleBoardCell from './DoggleBoardCell.js';

// for 4x4 standard boggle board
const boardSizeDimension = 4;

// handles cells and doggle(boggle don't sure me) solving
export default class DoggleBoard extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            board: Array(boardSizeDimension).fill("").map(row => new Array(boardSizeDimension).fill("")),
            usedLetters: Array(boardSizeDimension).fill(false).map(row => new Array(boardSizeDimension).fill(false)),
            wordsFound: [],
            solving: false
        }
        this.onSolve = this.onSolve.bind(this);
    }

    // when we pres submit, set up board
    onStartDoggleBoard = (event) => 
    {
        event.preventDefault();

        // check if correct size
        let searchValue = event.target[0].value;
        const boardLength = (boardSizeDimension * boardSizeDimension);
        if (searchValue.length !== boardLength || !isNaN(searchValue))
        {
            alert(`String must be of length ${boardLength}`);
            return;
        }
        else
        {
            searchValue = searchValue.toLowerCase();
            let doggleBoard = this.state.board;
            let row = 0;
            let column = 0;

            // set up doggleboard
            for (let i = 0; i < boardLength; ++i)
            {
                row = Math.floor(i / boardSizeDimension);
                column = Math.floor(i % boardSizeDimension);
                doggleBoard[row][column] = searchValue[i];
            }

            // set state
            this.setState(
            {
                board: doggleBoard,
                wordsFound: [],
                solving: true
            });

            this.onSolve();
        }
    }

    // kick off web worker
    onSolve = () =>
    {
        var that = this;
        var worker = new Worker("logic/DoggleLogic.js");

        // post current state of board
        worker.postMessage(
        {
            board: that.state.board 
        });

        // when done
        worker.onmessage = function(message) 
        {
            // on getting message
            if (message.data)
            {
                that.setState(
                {
                    wordsFound: message.data,
                    solving: false
                });
            }
        }
    }

    // render cell in board
    renderCell = (row, column) => 
    {
        let select = this.state.usedLetters[row][column];
        return <DoggleBoardCell value={this.state.board[row][column]} isSelected={select}/>;
    }

    // render the list of words found
    renderResults = () => 
    {
        let wordCount = this.state.wordsFound;
        if (wordCount.length <= 0)
        {
            return;
        }

        const listItems = this.state.wordsFound.map((word) => 
        {
            return (
                <tr>
                    <td>{word} </td>
                    <td>{this.getScore(word)}</td>
                </tr>
            );
        });
  
        return(
          <div>
            <tr>
                <th>Word</th>
                <th>Score</th>
            </tr>
            {listItems}
          </div>
        );
    }

    // Calculate score based on word length 
    getScore = (word) =>
    {
        /*The scoring is as follows(http://www.fun-with-words.com/play_boggle.html):
        Fewer than 3 Letters: no score.
        3 Letters: 1 point.
        4 Letters: 1 point.
        5 Letters: 2 points.
        6 Letters: 3 points.
        7 Letters: 4 points.
        8 or More Letters: 11 points.*/

        let score = 0;
        if (word.length === 3 || word.length === 4)
        {
            score = 1;
        }
        else if(word.length === 5)
        {
            score = 2;
        }
        else if(word.length === 6)
        {
            score = 3;
        }
        else if(word.length === 7)
        {
            score = 4;
        }
        else if(word.length >= 8)
        {
            score = 11;
        }
        else
        {
            score = 0;
        }

        return score;
    }

    render() 
    {
        // so we can show the solving text
        let solving = this.state.solving === true ? "Solving..." : "";
        return (
            <div className="container">
                <div className="left-half">
                <h1>Doggle Solver</h1>
                <img src={logo} className="logo" alt="Doggle" />
                <div id="doggle-container">
                    <form onSubmit={this.onStartDoggleBoard}>
                        <label>Board: </label>
                        <input type="text"/>
                        <button type="submit">Solve!</button>                       
                    </form>
                    <h2>{solving}</h2>
                    <div id="doggle-board">            
                        <ul className="flex-container row">
                            {this.renderCell(0, 0)}
                            {this.renderCell(0, 1)}
                            {this.renderCell(0, 2)}
                            {this.renderCell(0, 3)}
                        </ul>
                        <ul className="flex-container row">
                            {this.renderCell(1, 0)}
                            {this.renderCell(1, 1)}
                            {this.renderCell(1, 2)}
                            {this.renderCell(1, 3)}
                        </ul>
                        <ul className="flex-container row">
                            {this.renderCell(2, 0)}
                            {this.renderCell(2, 1)}
                            {this.renderCell(2, 2)}
                            {this.renderCell(2, 3)}
                        </ul>
                        <ul className="flex-container row">
                            {this.renderCell(3, 0)}
                            {this.renderCell(3, 1)}
                            {this.renderCell(3, 2)}
                            {this.renderCell(3, 3)}
                        </ul>                 
                    </div>
                </div>
            </div>
            <div className="right-half">
                <h1>Results: </h1>
                {this.renderResults()}          
            </div>
          </div>
        );
    }
}