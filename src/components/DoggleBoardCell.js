import React from 'react';

// renders a doggle board cell
export default class DoggleBoardCell extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
             value: "",
             isSelected: false
        };
    }

    render() 
    {
        // change look if this is the current selected letter
        const isCurrentlySelected = this.props.isSelected ? "flex-itemSelected " : "flex-item";
        return (<li className={isCurrentlySelected}>{this.props.value}</li>);
    }
}
