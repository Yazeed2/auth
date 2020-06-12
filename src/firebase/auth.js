
import {auth, firestore} from './firebase';
import {alertError, alertSuccess} from '../components/alerts/alerts'; 
import {registerCompleted} from '../components/alerts/Messages/success';

export const register = async (userInfo) => {
    const {email, password} = userInfo;
    auth.createUserWithEmailAndPassword(email, password)
    .then(userSnap => {
        delete userInfo.password; 
        delete userInfo.repeatPassword;
        const uid = userSnap.user.uid;
        firestore.collection('users').doc(uid).set({...userInfo})
        .then(done =>{
            alertSuccess(registerCompleted);
            Promise.resolve(true);
        })
        .catch(err=> {
            console.log('%c '+ err.message, 'background: #000; color: red');
            alertError(err.message);
            Promise.reject(new Error(err.message));

        })
 
    }) 
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        alertError(errorMessage);
        // ...
      });
}