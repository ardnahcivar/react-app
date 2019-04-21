import React,{Component} from 'react';
import WordList from './word-list/word-list';
import {MARKETPLACE_URL} from '../../assets/urls'; 

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
            <div>
                <p> it is a form</p>
                <form>
                    <input onChange={this.createInputChange} type="text" placeholder="createa word list" />
                    <button onClick={this.create}>CREATE</button>
                    <input type="text" placeholder="search"  onChange={this.Search}/>
                    <button onClick={this.Search}>SEARCH</button>
                </form>
                <div>
                    <WordList names={this.state.names} click={this.onClickHandler}/>
                </div>
            </div>
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
        console.log(this.props.match.url+'/'+word.sha);
        debugger
        this.props.history.push({pathname:this.props.match.url+'/'+word.sha,state:{names:list}});
    }
}

