import React from 'react';
import Aux from './../../hoc/auxy';
import styles from './spinner.module.css';

const spinner = () => {
    return (
        <Aux>
            <div  className={styles.spinner}></div>
        </Aux>
    )
} 

export default spinner;