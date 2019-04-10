import React,{Component} from 'react';
import  './main.css';
import WordList from './word-list/word-list';

export default class Main extends Component{
    filterWordList = [];
    constructor(props){
        super(props);
        this.state = {
            names:['GRE','GRE ESSENTIAL','GRE ADVANCED'],
            filternames: []
        }
        this.Search = this.Search.bind(this);
    }



    render(){
        return (
            <main>
                <p> it is a form</p>
                <form>
                    <input type="text" placeholder="createa word list" />
                    <button>CREATE</button>
                    <input type="text" placeholder="search"  onChange={this.Search}/>
                    <button onClick={this.Search}>SEARCH</button>

                </form>
                <div>
                    <WordList names={this.state.filternames} />
                </div>
            </main>
        )
    }


    Search(event){
        const value = event.target.value.toLowerCase();
        this.setState({
            filternames:this.state.names.filter(name => name.toLowerCase().includes(value))
        })
        // this.filterWordList =  this.state.names.filter(name => name.toLowerCase().includes(value));
        console.log(this.state.filternames);
        event.preventDefault();
    }

    Create(event){
    }
}

