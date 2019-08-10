import React from 'react';
import styles from './footer.module.css';
import isMobile from './../../services/checkDevice'
const footer = () => {
    return(
        isMobile?
        <footer className={styles.footer}>
            <p>created  for fun </p>
        </footer>
        :
        null
    )
}  
export default footer;