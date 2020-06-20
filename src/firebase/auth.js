
import {auth, firestore} from './firebase';
import {alertError, alertSuccess} from '../components/alerts/alerts'; 
import {registerCompleted} from '../components/alerts/Messages/success';
import { getByLabelText } from '@testing-library/react';

export const register = (userInfo, history) => new Promise( async (resolve, reject)=>{
    const {email, password} = userInfo;
    auth.createUserWithEmailAndPassword(email, password)
    .then(userSnap => {
        delete userInfo.password; 
        delete userInfo.repeatPassword;
        const uid = userSnap.user.uid;
        firestore.collection('users').doc(uid).set({...userInfo})
        .then(() => {
            userInfo.uid = uid
            resolve(userInfo);
            alertSuccess(registerCompleted);
        })
        .catch(err=> {
            console.log('%c '+ err.message, 'background: #000; color: red');
            alertError(err.message);
            reject(err.message);
        })
    }) 
    .catch(function(error) {
        // Handle Errors here.
        var errorMessage = error.message;
        console.log(errorMessage);
        alertError(errorMessage);
        reject(errorMessage)
        // ...
      });
})


export const signOut = async(setUserInfo) => {
    await auth.signOut()
    setUserInfo({userInfo:undefined})
}

export const login = async ({email, password}) => new Promise( async (resolve, reject)=> {
    try{ 
        await auth.signInWithEmailAndPassword(email, password)
        resolve(true)
    }catch(err){
        alertError(err.message)
        reject(err.messageCode)
    }
  
})