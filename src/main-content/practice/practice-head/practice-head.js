import React,{Component}from 'react';
import ProgressBar from './progress-bar/progress-bar';
import './practice-head.css';

export default class HeadPractice extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="practice-head">
                <p className="title-box">{this.props.title && this.props.title.replace('.json',' ')}</p>
                <ProgressBar className="progess-box" total={this.props.total} value={this.props.value} />
            </div>
        )
    }
}