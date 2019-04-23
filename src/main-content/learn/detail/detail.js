import React,{Component} from 'react';
import Word from './word-grid/word-grid';
import './detail.css'
import Side from './side/side';

export default class Detail extends Component{
    
    selectedId = null;
    selectedDetails = null;
    words = []; 
    state = {words:[],selectWord:null}
    
    constructor(props){
        super(props);
        this.startIndex = 0;
        this.wordLength = 20;
        this.endIndex = this.startIndex + this.wordLength;
    }

    componentDidMount(){
        this.selectedId = this.props.match.params.id;
        const names = this.props.location.state.names;
        this.selectedDetails = names.filter(word => word.sha === this.selectedId)[0];
        fetch(this.selectedDetails.download_url)
        .then(resonse => resonse.json())
        .then(data => {
            this.words = data;
            this.setState({words:data});
        })
    }

    render(){
        const list = this.state.words.slice(this.startIndex,this.endIndex);
        let res = list.length > 0 ? (
            list.map((word) => <Word  key={word.name + word.type} name={word.name} type={word.type} click={() => this.clickHandler(word)}/>) 
        ):null; 
        return (
            <>
            <div className="container-title"> 
                <h1>{this.selectedDetails && this.selectedDetails.name.replace('.json','')}</h1>
            </div>
            <div className="word-container">
                <div className="word-grid">
                    {res}
                </div>
                <aside>
                    <Side  {...this.state.selectWord}/>
                </aside>
            </div>
            </>
            
        )
    }


    clickHandler = (word) => {
        this.setState({
            selectWord:word
        })
    }

    showNext = () => {

    }

    showPrev = () => {

    }
}
