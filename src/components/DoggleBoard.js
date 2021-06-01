import React from 'react';
import './DoggleBoard.css';
import DoggleBoardCell from './DoggleBoardCell.js';
import PrefixTree from '../dataStructures/PrefixTree';

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
            prefixTree: null,
            board: Array(boardSizeDimension).fill("").map(row => new Array(boardSizeDimension).fill("")),
            usedLetters: Array(boardSizeDimension).fill(false).map(row => new Array(boardSizeDimension).fill(false)),
            isSolving: false,
        }
    }

    static init = () => 
    {
        // init prefix tree
        let dictionary = require("../data/dictionary.json");
        let tempPrefixTree = new PrefixTree();

        // add dictionary to prefix tree
        for (let i = 0; i < dictionary.length; ++i)
        {
            tempPrefixTree.add(dictionary[i]);
        }

        this.setState = 
        {
            prefixTree: tempPrefixTree,
        };
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

            // TODO start solving!!
            this.solveDoggleBoard();

            // set used letters as selected
        }
    }

    solve = () =>
    {
        // main solving function
    }

    solveDoggleBoard = () =>
    {
        // recursive solve

    }

    renderCell(row, column) 
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