import React from 'react';
import styles from './word-grid.module.css';

const Word = (props) => {
    return (
        <div className={styles.wordItem} onClick={props.click}>
            <p>{props.name}</p>
        </div>
    )
}

export default Word;