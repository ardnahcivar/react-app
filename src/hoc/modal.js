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
                            {
                                this.props.title && this.props.toggleModal
                                ?
                                <div className={styles.modalHeader}>
                                    <div className={styles.modalTitle}>
                                        <p>{this.props.title}</p>   
                                    </div>
                                    <div className={styles.modalClose}>
                                        <CloseIcon onClick={this.props.toggleModal} />    
                                    </div>
                                </div>
                                :
                                null
                            }

                            {
                                this.props.body 
                                ?
                                <div className={styles.modalBody}>
                                    {this.props.body}
                                </div>
                                :
                                <WrappedComponent {...this.props}/>
                            }
                            {
                                this.props.toggleModal ?
                                <div className={styles.modalFooter}>
                                    <p className={styles.modalClosed} onClick={this.props.toggleModal}>Close</p>
                                </div>
                                :
                                null
                            }
                        </div>
                    </div>
                )
            }
        }
    )
}

export default modal;