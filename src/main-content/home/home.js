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
                <div className={styles.back}></div>
                <div className={styles.description}>
                    <p>Prepare  for your Verbal GRE using it Wordlist application</p>
                    <p>Checkout the different Modes like <strong>Practice and Learn Mode</strong></p>
                    <p>You can also the view application on <strong>Mobile with Offline Capability</strong></p>
                </div>
                <div className={styles.actions}>
                    <div className={[styles.actionsContainer].join(' ')}>
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