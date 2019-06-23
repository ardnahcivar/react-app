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
}

const ModalHoc =  Modal(Settings);
export default ModalHoc;