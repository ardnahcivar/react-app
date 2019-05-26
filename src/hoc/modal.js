import React from 'react';
import styles from './modal.module.css';
import CloseIcon from 'react-icons/lib/md/close';


const modal = (WrappedComponent) => {
    return(
        class ModalHoc extends React.Component{
            render(){
                return(
                    <div className={styles.modalWrapper}>
                        <div className={styles.modal}>
                            {/* <WrappedComponent {...this.props} /> */}

                            <div className={styles.modalHeader}>
                                <div className={styles.modalTitle}>
                                    <p>{this.props.title}</p>   
                                </div>
                                <div className={styles.modalClose}>
                                    <CloseIcon onClick={this.props.toggleModal} />    
                                </div>
                            </div>
                            <div className={styles.modalBody}>
                                {this.props.body}
                            </div>
                            <div className={styles.modalFooter}>
                                <button onClick={this.props.toggleModal}>Close</button>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    )
}

export default modal;