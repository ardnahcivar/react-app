import React,{Component} from 'react';
import styles from  './practice-word.module.css';
import MdSpeakerIcon from 'react-icons/lib/md/volume-up';
import Spinner from './../../../components/spinner/spinner';
import dictateService from './../../../services/dictateMode';
import constants from './../../../assets/constants';
export default class PracticeWord extends Component{
    

    constructor(props){
        super(props);
        this.state = {
            showMeaning:false
        }
        this.showSpinner = true;
    }


    componentDidMount(){
        this.showSpinner = false;
    }

    componentDidUpdate(){
    }

    render(){
        const spinner = this.showSpinner ? <div className={styles.spinner}><Spinner /> </div> : null;

        let meaning,next;
        if(this.state.showMeaning){
            meaning = <div className={styles.wordInfo}> <p>{ this.props.word && this.props.word.information}</p>  </div>
            next = <p onClick={this.nextWord}>See next Word</p>;
        }else{
            meaning  = null;
            next = <p onClick={() => this.toggleMeaning()}> Click to See Meaning</p>;
        }

        return (
            <div className={styles.wordinfoContainer}>
                <div className={styles.wordBox}>
                    <div className={styles.title}> 
                        <p className={styles.word}>{ this.props.word && this.props.word.name}
                        {spinner}

                            <span onClick={() => this.readOut()} className={styles.readoutIcon}><MdSpeakerIcon /></span>
                        </p>
                        <p className={styles.type}>{ this.props.word && this.props.word.type}</p>  
                    </div>
                    { meaning }
                    <div className={styles.wordMeaning}>
                        {next}
                    </div>
                </div>
            </div>
        )
    }

    toggleMeaning = () => {
        this.setState({showMeaning: !this.state.showMeaning})
    }

    nextWord = () => {
        this.props.nextWord();
        this.toggleMeaning();
    }

    readOut = (word = this.props.word.name) => {
        let mode = parseInt(dictateService.getDicatateMode());
        console.log(this.props.word.information.split('\n\n'))
        let sentence;
        switch(mode){
            case constants.DICTATEMODE.WORD_ONLY:
                sentence = word;
                break;
            case constants.DICTATEMODE.WORD_DEF:
                sentence = `${this.props.word.name} whose type is ${this.props.word.type} and ${this.props.word.information.split('\n\n')[0]}`
                break;
            case constants.DICTATEMODE.WORD_COMP:
                sentence = `${this.props.word.name} whose type is ${this.props.word.type} ands ${this.props.word.information}`
                break;
            default:
                sentence = word;
        }
        const sp = new SpeechSynthesisUtterance();
        sp.text = sentence;
        sp.volume = 1;
        sp.rate = 1;
        sp.pitch = 1;
        window.speechSynthesis.speak(sp);
    }
}