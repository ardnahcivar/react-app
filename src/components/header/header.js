import React,{Component,Fragment} from 'react';
import Aux from './../../hoc/auxy';
import Settings from './../../components/appSettings/settings';
import styles from './header.module.css';
import SettingsIcon  from 'react-icons/lib/md/settings';
import constants  from './../../assets/constants';
import dictateService from './../../services/dictateMode';
import { Link } from 'react-router-dom';
import AuthenticationContext from './../../context/auth-context';
import firebaseService from './../../services/firebase';
import isMobile from './../../services/checkDevice';
import SideBar from './../../components/sidebar/sidebar';

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
                    <Link to="/">
                        <p id={styles.title}>Wordlist</p>
                        {/* <img alt='app logo' className={styles.logo} src={Logo} title="Wordlist Application"/> */}
                    </Link>
                    <AuthenticationContext.Consumer>
                        {
                            (context) => {
                                if(!isMobile)
                                    return(                                    
                                    <div className={styles.details}>
                                        { context && context.user ?
                                            <div className={styles.user}>Hey {context && context.user && context.user.name}</div>
                                            : null
                                        }
                                        {
                                            context && context.authenticated ?
                                            <div className={styles.logout} onClick={() => this.logout(context)  }>Logout</div>
                                            :
                                            <div className={styles.login} onClick={() => this.login(context)}>Login</div>
                                        }
                                        <div data-title='change the settings' className={[styles.settingsIcon,styles.tooltip,'tooltip'].join(' ')}>
                                            <SettingsIcon  onClick={this.toggleModal}/>
                                        </div>
                                    </div>
                                )
                                else return(        
                                        isMobile ? 
                                        <SideBar
                                            user={context} 
                                            settings={this.toggleModal}
                                            login={this.login}
                                            logout={this.logout}
                                        />
                                        :
                                        <Fragment>
                                            <Link to="/">Home</Link>
                                            <Link to="#">About</Link>
                                        </Fragment>
                                )
                            }
                        }
                    </AuthenticationContext.Consumer>
                   
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

    login = (context) => {
        firebaseService.userLogin(context)
    }

    logout = (context) => {
        firebaseService.userLogout(context);
    }
}

export default Header;