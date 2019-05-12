import React,{Component}from 'react';
import ProgressBar from './progress-bar/progress-bar';
import styles from './practice-head.module.css';

export default class HeadPractice extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className={styles.practiceHead}>
                <p className={styles.titleBox}>{this.props.title && this.props.title.replace('.json',' ')}</p>
                <ProgressBar className={styles.progessBox} total={this.props.total} value={this.props.value} />
            </div>
        )
    }
}