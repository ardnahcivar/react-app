import React from 'react';
import styles from  './word-list.module.css';
import AddIcon from 'react-icons/lib/md/add-circle-outline';
import AddWord from './../../../components/addWord/addWord';
import Aux from "./../../../hoc/auxy";

 export default class WordList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open:false,
            wordlist:null
        }
    }

    openAddWord = (event,word) =>  {
        this.setState({
            ...this.state,
            open:true,
            wordlist:word
        })
        event.stopPropagation();
    }
    
   render (){
    return (
        <Aux>
            <div className={styles.wordList}>
                {
                this.props.names.map((word) => {
                    return(
                            <div key={word.sha} className={styles.word} onClick={() => this.props.click(word,this.props.names)}>
                                {word.name.replace('.json','')}
                                    <span className={styles.wordAdd} onClick={(e)=>this.openAddWord(e,word.name.replace('.json',''))}><AddIcon /></span>
                            </div>
                        )
                    })
                }
            </div>
            {
                this.state.open ?
                <div className={styles.addWordContainer}>
                    <AddWord wordlist={this.state.wordlist}/>
                </div>
                :
                null
            }
            
        </Aux>
    )
   }
}
