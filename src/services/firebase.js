import * as firebase from 'firebase';
import APP_CONSTANTS from "./../assets/constants";
const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
const db = firebase.firestore();

export default class Firebase{


    static userLogin(context){
        context.firebase.auth().signInWithPopup(provider).then(function(result){
            console.log(result);
            context.setAuthState(true);
        })
        .catch(function(error){
            console.error(error);
        })
    }

    static userLogout(context){
        context.firebase.auth().signOut().then((v) => {
            context.setAuthState(false);
        }).catch((error) => {
            console.log('log out failed'+error);
        })
    }

    static userAuthenticated(){
        return firebase.auth().currentUser ? true : false;
    }

    static userExists(user){
        const userRef = db.collection(APP_CONSTANTS.COLLECTIONS.USERS);
        return userRef.where('email','==',user.email).where('name','==',user.displayName).get();
    }

    static createUser(user){
        return db.collection(APP_CONSTANTS.COLLECTIONS.USERS).add({
            email: user.email,
            name:user.displayName
        });
    }

    static findDocById(id){
        return db.collection(APP_CONSTANTS.COLLECTIONS.USERS).where('id','==',id).get();
    }

    static createDoc(collectionName,data){
        return db.collection(collectionName).add({
            ...data
        })
    }

    static getDoc(collectionName,condition){
        let queryRef = db.collection(collectionName).where(condition[0].key,'==',condition[0].value).where(condition[1].key,'==',condition[1].value);
        return queryRef.get();
    } 

}