import React from 'react';
import './word-list.css';

 const wordList = (props) =>{
    return (
        <div className="wordl-ist">
            {props.names.map((name) => <div className="word">{name}</div>)}
        </div>
    )
}

export default wordList;