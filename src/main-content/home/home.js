import React,{Component} from 'react';
import './home.css';


export default class Home extends Component{
  
    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log(this.props);
    }   

    render(){
        return (
            <div>
                <div className="description"></div>
                <div className="actions">
                    <button onClick={this.learn}>LEARN</button>
                    <button onClick={this.practice}>PRACTICE</button>
                </div>
            </div>
        )
    }

    learn = () => {
        this.props.history.push('/learn');
    }

    practice =() => {
        this.props.history.push('/practice');
    }
}