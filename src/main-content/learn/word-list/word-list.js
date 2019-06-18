import React from 'react';
import styles from  './word-list.module.css';
import AddIcon from 'react-icons/lib/md/add-circle-outline';

 const wordList = (props) => {
    function openAddWord() {
        alert('enrjb');
    }
    
    return (
        <div className={styles.wordList}>
            {
            props.names.map((word) => {
                return(
                        <div key={word.sha} className={styles.word} onClick={() => props.click(word,props.names)}>
                            {word.name.replace('.json','')}
                                <span className={styles.wordAdd} onClick={openAddWord}><AddIcon /></span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default wordList;