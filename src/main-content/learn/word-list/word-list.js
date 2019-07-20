import React from 'react';
import styles from  './word-list.module.css';
import AddIcon from 'react-icons/lib/md/add-circle-outline';
import {AddWithModal} from './../../../components/addWord/addWord';
import {addWordComponent} from './../../../components/addWord/addWord';

import Aux from "./../../../hoc/auxy";
import firebaseQueries from './../../../services/firebase';

 export default class WordList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open:false,
            wordlist:null,
            sha:null
        }
    }

    componentDidMount(){
        console.log(`auth state is ${firebaseQueries.userAuthenticated()}`);
    }

    openAddWord = (event,word) =>  {
        this.stateUpdateOnAuth({
                open:true,
                wordlist:word.name.replace('.json',''),
                sha:word.sha 
            });
        event.stopPropagation();
    }
    

    toggleAddWord = () => {
        this.stateUpdateOnAuth({
            open:!this.state.open
        })
    }

    stateUpdateOnAuth = (newState) => {
        if(firebaseQueries.userAuthenticated()){
            this.setState({
                ...this.state,
                ...newState
            })
        }else{
            //show snackbar to tell user to Login
            alert('not authenca')
        }
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
                                    <span data-title='click to add the word' className={[styles.wordAdd,'tooltip'].join(' ')} onClick={(e)=>this.openAddWord(e,word)}><AddIcon /></span>
                            </div>
                        )
                    })
                }
            </div>
            {
                this.state.open ?
                <div className={styles.addWordContainer}>
                    <AddWithModal body= {<addWordComponent />} toggleAdd={this.toggleAddWord} wordlist={this.state.wordlist} sha={this.state.sha}/>
                </div>
                :
                null
            }
            
        </Aux>
    )
   }
}
