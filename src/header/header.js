import React,{Component} from 'react';
import Aux from './../hoc/auxy';
import Settings from './../components/appSettings/settings';
import styles from './header.module.css';
import SettingsIcon  from 'react-icons/lib/md/settings';

class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            modalOpen:false,
            dictateMode:{
                
            }
        }
    }


    componentDidMount(){

    }
    
    render(){

        let modalBody =  <div>
            <p>Select the Dictate Mode</p>
            <input type="checkbox"/>Word with Complete Info <br/>
            <input type="checkbox"/>Word with Definition <br />
            <input type="checkbox" checked/>Word only <br />
        </div>
        return (
            <Aux>
                <header>
                    <a href="/ ">Home</a>
                    <div className={styles.settingsIcon}>
                        <SettingsIcon  onClick={this.toggleModal}/>
                    </div>
                    
                </header>
                {this.state.modalOpen ? <Settings 
                open={this.state.modalOpen} 
                toggleModal={this.toggleModal} 
                title='Settings'
                body = {modalBody}
                />:null}
            </Aux>
        )
    }

    toggleModal = () => {
        this.setState({
            ...this.state,
            modalOpen:!this.state.modalOpen
        })
    } 
}

export default Header;