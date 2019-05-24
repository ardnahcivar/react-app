import React,{Component} from 'react';
import Aux from './../../hoc/auxy';
import styles from  './home.module.css';


export default class Home extends Component{
  
    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log(this.props);
    }   

    render(){
        return (
            <Aux>
                <div className={`description ${styles.fiftyWHL}`}></div>
                <div className={`actions ${styles.fiftyWHR} ${styles.floatRight}`}>
                    <div className={styles.actionsContainer}>
                        <button tabIndex="1" className={styles.actionsBtn} onClick={this.learn}>LEARN</button>
                        <button tabIndex="2" className={styles.actionsBtn} onClick={this.practice}>PRACTICE</button>
                    </div>
                </div>
            </Aux>
        )
    }

    learn = () => {
        this.props.history.push('/learn');
    }

    practice =() => {
        this.props.history.push('/practice');
    }
}