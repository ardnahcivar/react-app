import React from 'react';
import styles from './addWord.module.css';
import {DEF_URL} from "./../../assets/urls";
import APP_CONSTANTS from './../../assets/constants';
import AddIcon from 'react-icons/lib/md/add-circle-outline';
import firebaseQueries from './../../services/firebase';


export default class AddWord extends React.Component{


    constructor(props){
      super(props);
      this.state = {
        name:'',
        type:'',
        def:{},
      }
      this.fetchProg = false;
      this.timeout = null;
    }
   
    componentDidMount(){
      console.log('called the mount')
    }

    componentWillMount(){
        clearTimeout(this.timeout);
    }
   
      render(){
        return(
            <div className={styles.createWord}>
                <div className={styles.head}>
                  <p className={styles.headTitle}>Add words in {this.props.wordlist}</p>
                </div>
                <div className={styles.inputContainer}>
                    <div className={styles.inputB}>
                      <input type="text" className={styles.name} placeholder="word" value={this.state.name} onChange={this.wordNameChange}/>
                      {/* <input type="text" className={styles.type} placeholder="type"/> */}
                    </div>
                    <div className={styles.getDfBtn}>
                      <button onClick={this.fetchDefin}>GET</button>
                      <div className={styles.addWord} onClick={this.addWord}><AddIcon /></div>
                    </div>
                </div>

                {
                  this.state.def && Object.keys(this.state.def).length
                  ?
                  <div className={styles.dataContainer}>
                  <div className={styles.wordHead}>
                    <p className={styles.wodname}>{this.state.def.word}</p>
                    <p className={styles.phonetic}>{this.state.def.phonetic}</p>
                  </div>
                  <div>
                    <p>{this.state.def.origin}</p>
                  </div>
                  <div className={styles.types}>
                  {
                    this.state.def.meaning ? 
                    Object.keys(this.state.def.meaning).map(t => <div className={styles.type}>{t}</div>)
                    :null
                  }
                  </div>
                  <div>
                    {this.state.def.meaning ?
                    Object.keys(this.state.def.meaning).map(k => {
                      return this.state.def.meaning[k].map(w => {  
                        return (
                          <div>
                            <p>{JSON.stringify(w)}</p>
                          </div>
                        )
                      })
                    })
                    :
                    null
                  }
                  </div>
                </div>
                  :
                  null
                }
            </div>
        )
    }
    
    wordNameChange = (e) => {
      this.setState({
        ...this.state,
        name:e.target.value,
      })
    }
  
    fetchDefin = async() => {
        try{
            this.fetchProg = false;
            if(this.state.name.trim().length){
                let dat = await fetch(`${DEF_URL}${this.state.name}`);
                let data = await dat.json();
                console.log(data);
                this.setState({
                    ...this.state,
                    def:data[0]
                })
            }
        }
        catch(e){
            console.log(`failed to load the definition ${e}`)
        }
        finally{
          this.fetchProg = false;
        }
    }

    addWord = async() => {
      //name type pron information aka defini mnenomic
      let def = '';
      Object.keys(this.state.def.meaning).map(key => {
        this.state.def.meaning[key].map(val => {
          def += val.definition;
          if(val.example)
            def += ' example:'+ val.example || '' + '\n';
        })
      })
      try {
        let wordAdd = await firebaseQueries.createDoc(APP_CONSTANTS.COLLECTIONS.WORDS,{
          name:this.state.def.word,
          type:Object.keys(this.state.def.meaning).join(','),
          mnemonic:this.state.def.origin,
          information:def,
          pronunciation:this.state.def.phonetic,
          id:this.props.sha
        }) 
      } catch (error) {
        console.error(`failede to add the word ${error}`);
      }
    }
  }