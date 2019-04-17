import React from 'react';
import './word-list.css';

 const wordList = (props) =>{
    return (
        <div className="word-list">
            {props.names.map((word) => <div key={word.sha} className="word" onClick={() => props.click(word)}>{word.name}</div>)}
        </div>
    )
}

export default wordList;