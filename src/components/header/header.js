import React,{Component} from 'react';
import Aux from './../../hoc/auxy';
import Settings from './../../components/appSettings/settings';
import styles from './header.module.css';
import SettingsIcon  from 'react-icons/lib/md/settings';
import constants  from './../../assets/constants';
import dictateService from './../../services/dictateMode';
import { Link } from 'react-router-dom';
import AuthenticationContext from './../../context/auth-context';


class Header extends Component{
    // static authContext = AuthenticationContext;
    constructor(props){
        super(props);
        this.dictateMode = [
            {value:constants.DICTATEMODE.WORD_ONLY,checked:false,name:'Word Only'},
            {value:constants.DICTATEMODE.WORD_DEF,checked:false,name:'Word with Definition'},
            {value:constants.DICTATEMODE.WORD_COMP,checked:false,name:'Word with Complete Info'}
        ];

        new dictateService();
        let mode = dictateService.getDicatateMode();
        this.dictateMode[parseInt(mode)].checked = true; 
        this.state = {
            modalOpen:false,
            dictateMode:this.dictateMode,
            dictateModeVal: mode
        }
    }


    componentDidMount(){
       
    }
    
    render(){
        let checkList = this.state.dictateMode.map(k => {
            return(
                <label className={styles.checkBox}>
                    <input type="checkbox" value={k.value} checked={k.checked} onChange={(e) => this.checkBoxonChange(e)}/>
                    {k.name}
                </label>    
                ) 
        })
        let modalBody =  <div className={styles.dictateBody}>
            <p>Select the Dictate Mode</p>
            {checkList}
        </div>
        return (
            <Aux>
                <header>
                    <Link to="/">Home</Link>
                    <AuthenticationContext.Consumer>
                        {
                            (context) => {
                                return(
                                    <Aux>
                                    <div>Hey {context && context.user && context.user.name}</div>
                                    {
                                        context && context.authenticated ?
                                        <div className={styles.logout}>Logout</div>
                                        :
                                        <div className={styles.login}>Login</div>
                                    }
                                    </Aux>
                                )
                            }
                        }
                    </AuthenticationContext.Consumer>
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
    
    checkBoxonChange = (e) => {
        const modeVal = e.target.value;
        const newState = this.state.dictateMode.map(mode => {
            if(mode.value === parseInt(modeVal)){
                return {...mode,checked :true}
            }else{
                return {...mode,checked :false}
            }
        });
        this.setState({
            ...this.state,
            dictateMode: newState,
            dictateModeVal:modeVal
        },() => {
            dictateService.setDictateMode(modeVal);
            console.log(this.state)
        })
    }
}

export default Header;