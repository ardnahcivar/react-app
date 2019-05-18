import React,{Component}from 'react';
import Head from './../practice-head/practice-head';
import Word from './../practice-word/practice-word';
import Aux from './../../../hoc/auxy';
import styles from './practice-container.module.css';
export default class PracticeContainer extends Component {
    
    marketList = [];
    selectedId = '';

    constructor(props){
        super(props);
        this.state = {selected:{},words:[],wordIndex: -1};
        this.nextWord = this.nextWord.bind(this);
        this.showSpinner = true;
    }

    componentDidMount(){
        this.marketList = this.props.location.state.names;
        this.selectedId = this.props.match.params.id;
        const selectedObj = this.marketList.filter(word => word.sha === this.selectedId )[0];
        fetch(selectedObj.download_url)
        .then(resonse => resonse.json())
        .then(data => {
            this.setState({words:data,
                selected:selectedObj,
                wordIndex:Math.floor (Math.random() * data.length)
            });
        })
        this.showSpinner = false;
    }


    nextWord = () => {
        if(this.state.wordIndex >= this.state.words.length){
            this.setState({
                wordIndex: 0
            });
        }else{
            this.setState({
                wordIndex: this.state.wordIndex + 1
            });
        }
    }

    render(){
        return(
            <Aux>
                <Head title={this.state.selected.name} total={this.state.words.length} value={this.state.wordIndex}  />
                <div className={styles.practiceContainer}>
                    <Word word = { this.state.words &&
                        this.state.words[this.state.wordIndex]}
                        nextWord={this.nextWord} 
                    />
                </div>
            </Aux>
        )
    }
}