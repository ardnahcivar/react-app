import * as firebase from 'firebase';
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

    static userExists(user){
        const userRef = db.collection('users');
        return userRef.where('email','==',user.email).where('name','==',user.displayName).get();
    }

    static createUser(user){
        return db.collection('users').add({
            email: user.email,
            name:user.displayName
        });
    }

    static findDocById(id){
        return db.collection('users').where('id','==',id).get();
    }

    static createWordList(collectionName,wordListName,createdBy){
        return db.collection(collectionName).add({
            list:wordListName,
            createdBy: createdBy
        })
    }

}