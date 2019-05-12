import React,{Component}from 'react';
import styles from  './progress-bar.module.css';


export default class ProgressBar extends Component{

    constructor(props){
        super(props);
        this.state = {
            total:this.props.total,
            value:parseInt(this.props.value),
            initial:parseInt(this.props.value)    
        }

    }

    componentWillReceiveProps(nextProps){
        if(parseInt(nextProps.value) > this.state.initial &&
            this.state.initial !== -1 &&
            this.state.value !== -1 &&
            this.state.total !== 0 ){
            this.setState({
                value:parseInt(nextProps.value),
            })
        }else{
            this.setState({
                total:nextProps.total,
                value:parseInt(nextProps.value),
                initial:parseInt(this.props.value)    
            })
        }
    }


    render(){
        const prog = (this.state.value - this.state.initial) / this.state.total * 100;
        const p = prog / 100 * 400;
        const width = {width:p || 0};
        return (
                <div className={styles.progressContainer}> 
                    <div className={styles.progress} style={width}></div>
                    <span className={styles.progressCount}>
                        {this.state.value - this.state.initial} / {this.state.total}
                    </span>
                </div>
            
        )
    }

}