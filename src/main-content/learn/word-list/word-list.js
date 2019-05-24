import React from 'react';
import styles from  './word-list.module.css';

 const wordList = (props) =>{
    return (
        <div className={styles.wordList}>
            {props.names.map((word) => <div key={word.sha} className={styles.word} onClick={() => props.click(word,props.names)}>{word.name.replace('.json','')}</div>)}
        </div>
    )
}

export default wordList;