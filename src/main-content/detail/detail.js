import React,{Component} from 'react';



export default class Detail extends Component{
    
    constructor(props){
        super(props);
    }

    componentDidMount(){
        debugger
        console.log(this.props)
    }

    render(){
        return 'Detail';
    }
}

