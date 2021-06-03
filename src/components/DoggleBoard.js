import React from 'react';
import './DoggleBoard.css';
import DoggleBoardCell from './DoggleBoardCell.js';
import PrefixTree from '../dataStructures/PrefixTree';

// for 4x4 standard boggle board
const boardSizeDimension = 4;
const minWordSize = 3;
let initialized = false;

// handles cells and doggle(boggle don't sure me) solving
export default class DoggleBoard extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = 
        {
            prefixTree: new PrefixTree(),
            board: Array(boardSizeDimension).fill("").map(row => new Array(boardSizeDimension).fill("")),
            usedLetters: Array(boardSizeDimension).fill(false).map(row => new Array(boardSizeDimension).fill(false))
        }
    }

    init = () => 
    {
        // init prefix tree
        let dictionary = require("../data/dictionary.json");
        let tempPrefixTree = this.state.prefixTree;

        // add dictionary to prefix tree
        for (let i = 0; i < dictionary.length; ++i)
        {
            tempPrefixTree.add(dictionary[i]);
        }

        this.setState(  
        {
            prefixTree: tempPrefixTree,
        });
    }
    
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
                board: doggleBoard
            });

            // read our dictionary - better place for this
            if (!initialized)
            {
                this.init();
                initialized = true;
            }

            // solve our board
            this.solve();
        }
    }

    // our main solving fucntion
    solve = () =>
    {
        for (let i = 0; i < boardSizeDimension; ++i)
        {
            for (let j = 0; j < boardSizeDimension; ++j)
            {
                this.solveDoggleBoard("", i, j);
            }
        }

        console.log(`done`);
    }

    // recursive solving function
    solveDoggleBoard = (current, row, column) =>
    {        
        let word = current + this.state.board[row][column];

        if (word.length >= minWordSize)
        {
            if (this.state.prefixTree.search(word))
            {
                console.log(`word found: ${word}`);
            }
        }

        // solve in all directions
        for (let i = -1; i <= 1; ++i)
        {
            for (let j = -1; j <= 1; ++j)
            {
                if ((row + i >= 0 && row + i < boardSizeDimension) &&
                (column + j >= 0 && column + j < boardSizeDimension))
                {
                    // check if current letter is being used, if so skip to next
                    if (this.state.usedLetters[row + i][column + j])
                    {
                        continue;
                    }

                    // set state
                    this.setUsedLetters(row + i, column + j, true);
                    this.solveDoggleBoard(word, row + i, column + j);
                    this.setUsedLetters(row + i, column + j, false);
                }
            }
        }
    }

    // update letters that have been used in board
    setUsedLetters = (row, column, value) =>
    {
        let used = this.state.usedLetters;     
        used[row][column] = value;
        this.setState( 
        {
            usedLetters: used
        });
    }

    renderCell = (row, column) => 
    {
        let select = this.state.usedLetters[row][column];
        return <DoggleBoardCell value={this.state.board[row][column]} isSelected={select}/>;
    }

    render() 
    {
        return (
            <div id="doggle-container">
                <form onSubmit={this.onStartDoggleBoard}>
                    <label>Board: </label>
                    <input type="text"/>
                    <button type="submit">Solve!</button>
                </form>
                <div id="doggle-board">            
                    <ul class="flex-container row">
                        {this.renderCell(0, 0)}
                        {this.renderCell(0, 1)}
                        {this.renderCell(0, 2)}
                        {this.renderCell(0, 3)}
                    </ul>
                    <ul class="flex-container row">
                        {this.renderCell(1, 0)}
                        {this.renderCell(1, 1)}
                        {this.renderCell(1, 2)}
                        {this.renderCell(1, 3)}
                    </ul>
                    <ul class="flex-container row">
                        {this.renderCell(2, 0)}
                        {this.renderCell(2, 1)}
                        {this.renderCell(2, 2)}
                        {this.renderCell(2, 3)}
                    </ul>
                    <ul class="flex-container row">
                        {this.renderCell(3, 0)}
                        {this.renderCell(3, 1)}
                        {this.renderCell(3, 2)}
                        {this.renderCell(3, 3)}
                    </ul>                 
                </div>
            </div>
        );
    }
}