import React from 'react';
import styles from './addWord.module.css';
import {DEF_URL} from "./../../assets/urls";
import APP_CONSTANTS from './../../assets/constants';
import AddIcon from 'react-icons/lib/md/add-circle-outline';
import firebaseQueries from './../../services/firebase';
import CloseIcon from  'react-icons/lib/md/close';
import {withToastManager} from 'react-toast-notifications';
import Modal from '../../hoc/modal';



class AddWord extends React.Component{

    constructor(props){
      super(props);
      this.state = {
        name:'',
        type:'',
        def:{},
        getDefCalled:false
      }
      this.fetchProg = false;
    }
   
    componentDidMount(){
      console.log('called the mount')
    }

    componentWillMount(){
    }
   
    updateDefCalled = () => {
      this.setState({
        ...this.state,
        getDefCalled:!this.state.getDefCalled
      })
    }

      render(){
        return(
          <div className={styles.modalWrapper}>
            <div className={styles.createWord}>
                <div className={styles.head}>
                  <h3 className={styles.headTitle}>Add words in {this.props.wordlist}
                    <span className={styles.closeIconContainer} onClick={(e) => this.props.toggleAdd()}>
                      <CloseIcon />
                    </span>
                  </h3>
                </div>
                <div className={styles.inputContainer}>
                    <div className={styles.inputB}>
                      <input type="text" className={styles.name} placeholder="Enter the word" value={this.state.name} onChange={this.wordNameChange}/>
                    </div>
                    <button className={styles.defi} onClick={this.fetchDefin}>GET</button>

                    {/* <div className={styles.getDfBtn}>
                      <button className={styles.defi} onClick={this.fetchDefin}>GET</button>
                      <div className={styles.addWord} onClick={this.addWord}><AddIcon /></div>
                    </div> */}
                </div>
                { this.state.def && Object.keys(this.state.def).length ?
                  <hr id={styles.defSeparator}/>
                  : null
                }
                {
                  this.state.def && Object.keys(this.state.def).length
                  ?
                  <div className={styles.dataContainer}>
                  <div className={styles.wordHead}>
                    <h4 className={styles.wodname}>{this.state.def.word}</h4>
                    <h4 className={styles.phonetic}>{this.state.def.phonetic}</h4>
                  </div>
                  <div className={styles.originContainer}>
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
                          <div className={styles.meanContainer}>
                            {w.definition ?
                            <p>
                              <label>definition: </label>
                              {w.definition}
                            </p>
                            :
                            null
                            }
                            { w.example ?
                              <p>
                              <label>example: </label>
                                {w.example}
                              </p>
                              :
                              null
                            }                  
                            {
                              w.synonyms
                              ?
                              <p>
                                <label>synonyms: </label>
                                {w.synonyms.join(' ,')}
                              </p>
                              :
                              null
                             }
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
                <div className={styles.getDfBtn}>
                  {
                    this.state.getDefCalled ?
                    <div className={styles.addWord} onClick={this.addWord}><AddIcon /></div>
                    :
                    null
                  }     
                </div>
                {/* {
                  this.state.def && Object.keys(this.state.def).length 
                  ?
                  <div className={styles.modalWrapper}></div>
                  :
                  null
                } */}
              
            </div>
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
                    def:data[0],
                    getDefCalled:!this.state.getDefCalled
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
      const { toastManager } = this.props;
      if(this.state.name && this.state.def){
        Object.keys(this.state.def.meaning).map(key => {
          this.state.def.meaning[key].map(val => {
            def += val.definition;
            if(val.example)
              def += ' example:'+ val.example || '' + '\n';
          })
        })
      
        await firebaseQueries.createDoc(APP_CONSTANTS.COLLECTIONS.WORDS,{
          name:this.state.def.word,
          type:Object.keys(this.state.def.meaning).join(','),
          mnemonic:this.state.def.origin,
          information:def,
          pronunciation:this.state.def.phonetic,
          id:this.props.sha
        }).then( _ => {
          toastManager.add(`Created the word ${this.state.def.word}`, { 
            appearance: 'info',
            autoDismiss: true,
            pauseOnHover: false}
          );
        }).catch(error => {
          console.error(`failed to add the word ${error}`);
          toastManager.add(`Faile to add Word ${this.state.def.word}`, { 
            appearance: 'error',
            autoDismiss: true,
            pauseOnHover: false}
          );
        });
      }else{
        toastManager.add(`Enter correct word name to add `, { 
          appearance: 'error',
          autoDismiss: true,
          pauseOnHover: false}
        );
      }
      this.props.toggleAdd();
    } 
  }

export const AddWithModal = Modal(withToastManager(AddWord));
export const addWordComponent = AddWord; 