import React,{Component}from 'react';
import Head from './../practice-head/practice-head';
import Word from './../practice-word/practice-word';

export default class PracticeContainer extends Component {
    
    marketList = [];
    selectedId = '';
    
    constructor(props){
        super(props);
        this.state = {selected:{},words:[]};
    }

    componentDidMount(){
        this.marketList = this.props.location.state.names;
        this.selectedId = this.props.match.params.id;
        const selectedObj = this.marketList.filter(word => word.sha === this.selectedId )[0];
        fetch(selectedObj.download_url)
        .then(resonse => resonse.json())
        .then(data => {
            this.setState({words:data,selected:selectedObj});
        })
    }

    render(){
        return(
            <div>
                <Head title={this.state.selected.name}  />
                <div className="practice-container">
                    <Word word = { this.state.words &&
                        this.state.words[Math.floor (Math.random() * this.state.words.length)]} 
                    />
                </div>
            </div>
        )
    }
}