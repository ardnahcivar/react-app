import React,{Component} from 'react';
import Aux from './../../../hoc/auxy';
import Spinner from './../../../components/spinner/spinner';
import styles from './detail.module.css'
import MdBookmark from 'react-icons/lib/md/bookmark-outline';
import MdArrowUpward from 'react-icons/lib/md/arrow-upward';
import MdBookmarkFill from 'react-icons/lib/md/bookmark';

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
        this.bookmarker = localStorage.getItem('bookMarker');
        this.bookmarkerFlag = false;
        this.showSpinner = true;
    }

    componentDidMount(){
        this.selectedId = this.props.match.params.id;
        const names = this.props.location.state.names;
        this.selectedDetails = names.filter(word => word.sha === this.selectedId)[0];
        fetch(this.selectedDetails.download_url)
        .then(resonse => resonse.json())
        .then(data => {
            this.words = data;
            this.setState({words:data},()=>{
                this.scrollIntoWord();
                // inadvertent1557932034874'
            });
        })
        this.showSpinner = false;
    }

    render(){
        const spinner = this.showSpinner ? <div className={styles.spinner}><Spinner /> </div> : null;
        const list = this.state.words;
        let res = list.length > 0 ? (
            list.map((word) => {
            this.bookmarkerFlag = (word.name + word.type) === this.bookmarker;
             return (
                <div id={word.name + word.type} key={word.name + word.type } onClick={this.bookMarkIt} className={styles.wordBlock}>
                    <div className={styles.wordNameContainer}>
                        <p className={styles.wordName}>{word.name}</p>
                        <p className={styles.wordPronun}>{word.pronunciation}</p>
                        {this.bookmarkerFlag ?
                        <span className={[styles.bookMark,styles.bookMarked].join(' ')}>
                            <MdBookmarkFill />
                        </span>
                        :
                        <span className={styles.bookMark}>
                            <MdBookmark />
                        </span>
                        }
                    </div>   
                    <div className={styles.wordinfoContainer}>
                        <p className={styles.wordType}>{word.type}</p>
                        <p className={styles.wordInfon}>{word.information}</p>
                        <p className={styles.wordInfon}>{word.mnemonic}</p>
                    </div>     
                </div>)
            })
        ):null;
        return (
            <Aux>
                {spinner}
                <div className={styles.goUp}>
                    <div className={styles.upArrow} onClick={() => document.getElementById('root').scrollIntoView()}>
                        <MdArrowUpward />
                    </div>
                </div>
                {!this.showSpinner ? 
                <div className={styles.containerTitle}>
                    <h3>{this.selectedDetails && this.selectedDetails.name.replace('.json','')}</h3>
                </div>
                : null}
                <div className={styles.wordContainer}>
                    <div className={styles.wordGrid}>
                            {res}
                    </div>
                </div>
            </Aux>
        )
    }


    clickHandler = (word) => {
        this.setState({
            selectWord:word
        })
    }


    bookMarkIt = (e) => {
        const bookId = e.currentTarget.id;
        localStorage.setItem('bookMarker',bookId);
        e.preventDefault();
    }


    scrollIntoWord = () => {
        const element = document.querySelector(`#${localStorage.getItem('bookMarker')}`);
        if(element) element.scrollIntoView({behavior:"smooth"});
    }

    showNext = () => {

    }

    showPrev = () => {

    }
}
