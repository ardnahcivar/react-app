import React from 'react';
import Modal from '../../hoc/modal';

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