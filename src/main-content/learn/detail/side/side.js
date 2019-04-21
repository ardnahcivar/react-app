import React from 'react';
import './side.css';

class Side extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className="word-info">
                <p>{this.props.name}</p>
                <p>{this.props.type}</p>
                <p>{this.props.mnemonic}</p>
                <p>{this.props.information}</p>
                <p>{this.props.pronunciation}</p>
            </div>
        )
    }
}

export default Side;