import React,{Component} from 'react';
import './practice-word.css';

export default class PracticeWord extends Component{
    

    constructor(props){
        super(props);
        this.state = {
            showMeaning:false
        }
    }


    componentDidMount(){
    }

    componentDidUpdate(){
    }


    render(){
        let meaning,next;
        if(this.state.showMeaning){
            meaning = <div className="wordinfo"> <p>{ this.props.word && this.props.word.information}</p>  </div>
            next = <p onClick={this.nextWord}>See next Word</p>;
        }else{
            meaning  = null;
            next = <p onClick={() => this.toggleMeaning()}> Click to See Meaning</p>;
        }

        return (
            <div className="word-info-container">
                <div className="word-box">
                    <div className="title"> 
                        <p className="word">{ this.props.word && this.props.word.name}</p>
                        <p className="type">{ this.props.word && this.props.word.type}</p>  
                    </div>
                    { meaning }
                    <div className="word-meaning">
                        {next}
                    </div>
                </div>
            </div>
        )
    }

    toggleMeaning = () => {
        this.setState({showMeaning: !this.state.showMeaning})
    }

    nextWord = () => {
        this.props.nextWord();
        this.toggleMeaning();
    }
}