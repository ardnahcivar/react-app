import React,{Component}from 'react';

export default class HeadPractice extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <p>{this.props.title && this.props.title.replace('.json',' ')}</p>
            </div>
        )
    }
}