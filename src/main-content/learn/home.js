import React,{Component} from 'react';
import WordList from './word-list/word-list';
import {MARKETPLACE_URL} from '../../assets/urls'; 
import Aux from  './../../hoc/auxy';
import styles from './home.module.css';
import Spinner from './../../components/spinner/spinner';
import CancelIcon from  'react-icons/lib/md/cancel';
import SearchIcon from 'react-icons/lib/md/search';
import AuthenticationContext from './../../context/auth-context';
import FirebaseQueries from './../../services/firebase';
import APP_CONSTANTS from "./../../assets/constants";
 import {withToastManager} from 'react-toast-notifications';

class Home extends Component {

    filterWordList = [];
    createInputText = '';


    constructor(props){
        super(props);
        this.state = {
            names:[],
            originalNames: [],
            createInputText: '',
            user:null,
        }
        this.Search = this.Search.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.showSpinner = true;
    }


    componentDidMount(){
        fetch(MARKETPLACE_URL)
        .then(response => response.json())
        .then(data => {
            this.setState({
                names:data,
                originalNames:data
            });
        });
        this.showSpinner = false;
    }


    componentDidUpdate(){
        if(!this.state.user && this.context && this.context.user ){
            this.setState({
                ...this.state,
                user:this.context.user
            },() => {
                this.fetchUserSpecificWords();
            })
        }        
    }

    createInputChange = (event) => {
        this.setState({
            ...this.state,
            createInputText:event.target.value
        })
    }

    fetchUserSpecificWords = async() => {
        let words = await FirebaseQueries.getDoc(APP_CONSTANTS.COLLECTIONS.WORDLIST,
            [
                { key:'createdBy',value:this.state.user.id },
                { key:'createdBy',value:this.state.user.id }
            ])
        let temp = [];
        words.forEach((doc) => {
            temp.push({sha:doc.id,name:doc.data().name})
        });
        this.setState({
            ...this.state,
            names:this.state.names.concat(temp),
            originalNames:this.state.names.concat(temp)
        })
    }

    clearInputText = () => {
        this.setState({
            ...this.state,
            createInputText:''
        })
    }

    Search = (event) => {
        const value = event.target.value.toLowerCase();
        if(value.length){
            this.setState({
                ...this.state,
                names:this.state.names.filter(word => word.name.toLowerCase().includes(value))
            })
        }else{
            this.setState({
                ...this.state,
                names:this.state.originalNames
            })
        }
        event.preventDefault();
    }

   create = async(event, context) => {
    const { toastManager } = this.props;
        if(this.state.createInputText.trim().length){
            try{
                let wordAlreadyCreated = await FirebaseQueries.getDoc('wordlist',
                    [
                        { key:'name',value: this.state.createInputText },
                        { key:'createdBy',value:context.user.id }
                    ]
                );            
                if(!wordAlreadyCreated.docs.length){
                    let createWord = await FirebaseQueries.createDoc(APP_CONSTANTS.COLLECTIONS.WORDLIST,
                                    {
                                        name:this.state.createInputText,
                                        createdBy:context.user.id
                                    })
                    let tempName = this.state.createInputText;
                    const newState = this.state.names.concat({name:this.state.createInputText});
                    if(newState.length){
                        this.setState({
                            ...this.state,
                            names:newState,
                            createInputText:''
                        },()=>{
                            toastManager.add(`Created Successfully ${tempName}`, { 
                                appearance: 'success',
                                autoDismiss: true,
                                pauseOnHover: false}
                            );
                        });
                    }
                }
            }
            catch(error){
                console.log(`Failed to create  ${error}`)
                toastManager.add('Failed to create', { 
                    appearance: 'error',
                    autoDismiss: true,
                    pauseOnHover: false});
            }
        }
        event.preventDefault();
    }

    onClickHandler = (word,list) => {
        this.props.history.push({pathname:this.props.match.url+'/'+word.sha,state:{names:list}});
    }


    OnAuthCallFun = (e,context,func) => {
        if(FirebaseQueries.userAuthenticated()){
            func(e,context);
        }else{
            //show snackbar to tell user to Login
        }
    }

    render(){
        const spinner = this.showSpinner ? <div className={styles.spinner}><Spinner /> </div> : null;
        return (
            <AuthenticationContext.Consumer>
                {
                    (context) => {
                        return (
                            <Aux>   
                <div id={styles.wordList}>
                    <div className={[styles.fieldSet,styles.first].join(' ')}>
                        <input id="wordname" type="text" value={this.state.createInputText} autoComplete="off" onChange={(e) => this.createInputChange(e)} placeholder="create a wordlist" />
                        <div data-title='clear the input text' className={[styles.clearInputIcon,'tooltip'].join(' ')} onClick={this.clearInputText}>
                            <CancelIcon />
                        </div>
                    </div>
                    <button data-title='click to create a wordlist' className={[styles.create,'tooltip'].join(' ')} onClick={(e) => this.OnAuthCallFun(e,context,this.create)}>CREATE</button>
                    <div className={[styles.fieldSet,styles.floatRight].join(' ')}>
                        <input id={styles.searchWord}  onChange={(e) => this.Search(e) } type="text" autoComplete="off" placeholder="Search"/>
                        <div data-title='searth the word' className={[styles.searchIcon,styles.tooltip,'tooltip'].join(' ')}>
                            <SearchIcon />
                        </div>
                    </div>
                    {spinner}
                    <Aux>
                        { this.state.names.length  ?
                            <WordList names={this.state.names} click={this.onClickHandler}/>
                            : (this.showSpinner ? null:<p className={styles.searchNotFound}>Not Found</p>)
                        }
                    </Aux>
                </div>
            </Aux>
                        )
                    }
                }
            </AuthenticationContext.Consumer>
        )
    }
}

Home.contextType = AuthenticationContext;
export default withToastManager(Home)