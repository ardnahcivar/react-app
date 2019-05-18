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
        // const list = this.state.words.slice(this.startIndex,this.endIndex);
        const spinner = this.showSpinner ? <div className={styles.spinner}><Spinner /> </div> : null;
        const list = this.state.words;
        let res = list.length > 0 ? (
            list.map((word) => {
            //  <Word  key={word.name + word.type} name={word.name} type={word.type} click={() => this.clickHandler(word)}/>
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
                <div className="container-title"> 
                    <h1>{this.selectedDetails && this.selectedDetails.name.replace('.json','')}</h1>
                </div>
                <div className={styles.wordContainer}>
                    <div className={styles.wordGrid}>
                        {res}
                    </div>
                    {/* <aside>
                        <Side  {...this.state.selectWord}/>
                    </aside> */}

                    {/* <div className={styles.wordGrid}>
                            <div className="word-block">
                                    <div className="word-name">
                                    <p>zenith</p>
                                    </div>
                                    <div className="word-info-container">
                                        <p className="word-type">noun</p>
                                        <p className="word-infon">
                                        Definition: High point, culmination Usage: At the zenith of her career, the actress could command $5 million per film. Now, she is mostly seen in made-for-TV movies. Related Words: Acme, Summit, Pinnacle (synonyms), Apex (vertix, tip, point), Apogee (high point, point at which the moon is furthest from the Earth) More Info: The opposite of the zenith is the nadir, or lowest point. Both words are terms from astronomy, referring to points directly above and below the observer on an imaginary sphere on which celestial bodies appear to be projected. On the GRE, these words will be used metaphorically —the nadir of one’s struggles, the zenith of one’s success.
                                        </p>
                                    </div>
                            </div>
                    </div> */}


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
        if(element) element.scrollIntoView();
    }

    showNext = () => {

    }

    showPrev = () => {

    }
}
