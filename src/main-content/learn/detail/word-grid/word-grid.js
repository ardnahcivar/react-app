import React from 'react';
import './word-grid.css';

const Word = (props) => {
    return (
        <div className="word-item" onClick={props.click}>
            <p>{props.name}</p>
        </div>
    )
}

export default Word;