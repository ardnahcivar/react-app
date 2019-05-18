import React,{Component} from 'react';
import WordList from './word-list/word-list';
import {MARKETPLACE_URL} from '../../assets/urls'; 
import Aux from  './../../hoc/auxy';
import styles from './home.module.css';
import Spinner from './../../components/spinner/spinner';

export default class Home extends Component {

    filterWordList = [];
    createInputText = '';

    constructor(props){
        super(props);
        this.state = {
            names:[],
            filternames: []
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
                names:data
            });
        });
        this.showSpinner = false;
    }

    render(){
        const spinner = this.showSpinner ? <div className={styles.spinner}><Spinner /> </div> : null;
        return (
            <Aux>
                <form id={styles.wordList}> 
                    <label for="wordname">Name</label>
                    <input id="wordname" type="text" onChange={(e) => this.createInputChange(e)} placeholder="create a wordlist" />
                    <button className="word-create" onClick={(e) => this.create(e)}>CREATE</button>
                    <input id={styles.searchWord} type="text" placeholder="Search"/>
                </form>
                {spinner}
                <Aux>
                    <WordList names={this.state.names} click={this.onClickHandler}/>
                </Aux>
            </Aux>
        )

    }
        

    createInputChange = (event) => {
        this.createInputText = event.target.value;
    }

    Search = (event) => {
        const value = event.target.value.toLowerCase();
        this.setState({
            filternames:this.state.names.filter(name => name.toLowerCase().includes(value))
        })
        console.log(this.state.filternames);
        event.preventDefault();
    }

    create = (event) => {
        if(this.createInputText.trim().length){
            const newState = this.state.names.concat({name:this.createInputText});
            if(newState.length){
                this.setState({names:newState});
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

