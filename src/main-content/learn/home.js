import React,{Component} from 'react';
import WordList from './word-list/word-list';
import {MARKETPLACE_URL} from '../../assets/urls'; 
import Aux from  './../../hoc/auxy';
import styles from './home.module.css';
import Spinner from './../../components/spinner/spinner';
import CancelIcon from  'react-icons/lib/md/cancel';
import SearchIcon from 'react-icons/lib/md/search';

export default class Home extends Component {

    filterWordList = [];
    createInputText = '';

    constructor(props){
        super(props);
        this.state = {
            names:[],
            originalNames: [],
            createInputText: ''
        }
        this.Search = this.Search.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.showSpinner = true;
    }


    componentDidMount(){
        console.log(this.props);
        fetch(MARKETPLACE_URL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({
                names:data,
                originalNames:data
            });
        });
        this.showSpinner = false;
    }

    render(){
        const spinner = this.showSpinner ? <div className={styles.spinner}><Spinner /> </div> : null;
        return (
            <Aux>
                <div id={styles.wordList}>
                    <div className={[styles.fieldSet,styles.first].join(' ')}>
                        {/* <label htmlFor="wordname">Name</label> */}
                        <input id="wordname" type="text" value={this.state.createInputText} autoComplete="off" onChange={(e) => this.createInputChange(e)} placeholder="create a wordlist" />
                        <div className={styles.clearInputIcon} onClick={this.clearInputText}>
                            <CancelIcon />
                        </div>
                    </div>
                    <button  onClick={(e) => this.create(e)}>CREATE</button>
                    <div className={[styles.fieldSet,styles.floatRight].join(' ')}>
                        <input id={styles.searchWord}  onChange={(e) => this.Search(e) } type="text" autoComplete="off" placeholder="Search"/>
                        <div className={styles.searchIcon}>
                            <SearchIcon />
                        </div>
                    </div>
                    {spinner}
                    <Aux>
                        { this.state.names.length  ?
                            <WordList names={this.state.names} click={this.onClickHandler}/>
                            : (this.showSpinner ? null:<p className={styles.center}>Not Found</p>)
                        }
                    </Aux>
                </div>
            </Aux>
        )

    }       
        

    createInputChange = (event) => {
        // this.screateInputText = event.target.value;
        this.setState({
            ...this.state,
            createInputText:event.target.value
        })
    }

    clearInputText = () => {
        // this.createInputText = '';
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
        console.log(this.state.filternames);
        event.preventDefault();
    }

    create = (event) => {
        if(this.state.createInputText.trim().length){
            const newState = this.state.names.concat({name:this.state.createInputText});
            if(newState.length){
                this.setState({
                    ...this.state,
                    names:newState,
                    createInputText:''
                });
            }
        }else{
            alert('failed to create');
        }
        event.preventDefault();
    }

    onClickHandler = (word,list) => {
        this.props.history.push({pathname:this.props.match.url+'/'+word.sha,state:{names:list}});
    }
}

