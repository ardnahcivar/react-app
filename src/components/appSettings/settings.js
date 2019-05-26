import React from 'react';
import Modal from '../../hoc/modal';
import Aux from '../../hoc/auxy';
import styles from './settings.module.css';
import CloseIcon from 'react-icons/lib/md/close';

class Settings extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            open:this.props.open
        }
    }

    componentDidMount(){

    }

    // render(){
    //     return (
    //         <Aux>
    //             <div className={styles.modalHeader}>
    //                 <div className={styles.modalTitle}>
    //                     <p>Settings</p>   
    //                 </div>
    //                 <div className={styles.modalClose}>
    //                     <CloseIcon onClick={this.props.toggleModal} />    
    //                 </div>
    //             </div>
    //             <div className={styles.modalBody}>
    //                 <p>Settings</p>
    //             </div>
    //         </Aux>
    //     )
    // }
}

const ModalHoc =  Modal(Settings);
export default ModalHoc;