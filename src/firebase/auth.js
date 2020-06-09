import {auth, firestore} from './firebase'

export const register = (email, password) => {

    auth.createUserWithEmailAndPassword(email, password)
    .then(something => {
        console.log(something);
        
    }) 
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        
        // ...
      });


}