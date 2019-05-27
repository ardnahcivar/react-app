
class DicatateMode {
    static dictataKey = 'dictateKey';
    
    constructor(){
        let defaultMode = localStorage.getItem(DicatateMode.dictataKey);
        console.log(defaultMode.trim.length);
        if(defaultMode.trim.length >= 0){

        }else{
            DicatateMode.setDictateMode('0');
        }
    }

    static getDicatateMode(){
        const mode = localStorage.getItem(DicatateMode.dictataKey);
        return mode;
    }

    static setDictateMode(val){
        localStorage.setItem(DicatateMode.dictataKey,val);
    } 
 }

 export default DicatateMode;