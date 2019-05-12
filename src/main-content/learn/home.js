import React,{Component} from 'react';
import WordList from './word-list/word-list';
import {MARKETPLACE_URL} from '../../assets/urls'; 
import Aux from  './../../hoc/auxy';
import styles from './home.module.css';

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
    }


    componentDidMount(){
        console.log(this.props);
        fetch(MARKETPLACE_URL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({
                names:data
            })
        })
    }

    render(){
        return (
            <Aux>
                <form id={styles.wordList}> 
                    <label for="wordname">Name</label>
                    <input id="wordname" type="text" placeholder="create a wordlist" />
                    <button className="word-create" onClick={this.create}>CREATE</button>
                    <input id={styles.searchWord} type="text" placeholder="Search"/>
                </form>
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
        const newState = this.state.names.concat(this.createInputText);
        if(newState.length){
            this.setState({names:newState});
        }
        event.preventDefault();
    }

    onClickHandler = (word,list) => {
        this.props.history.push({pathname:this.props.match.url+'/'+word.sha,state:{names:list}});
    }
}

