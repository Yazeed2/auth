
import {auth, firestore} from './firebase';
import {alertError, alertSuccess} from '../components/alerts/alerts'; 
import {registerCompleted} from '../components/alerts/Messages/success';
import { getByLabelText } from '@testing-library/react';

export const register = (userInfo) => new Promise( async (resolve, reject)=>{
    const {email, password} = userInfo;
    auth.createUserWithEmailAndPassword(email, password)
    .then(userSnap => {
        delete userInfo.password; 
        delete userInfo.repeatPassword;
        const uid = userSnap.user.uid;
        firestore.collection('users').doc(uid).set({...userInfo})
        .then(done =>{
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
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        alertError(errorMessage);
        reject(errorMessage)
        // ...
      });
})

export const onAuthStateChange = (setUserInfo, authState) => new Promise(async(resolve, reject) => { 
     // on auth state changes 
     auth.onAuthStateChanged(async(user)=>{ 
         if(user){
            // user is logged in 
            // check if the global store has a user and fetch the data if not 
            if(authState.userInfo){
                // userInfo is saved in the global state
                resolve({loggedIn: true})    
            }else{
                // get user data from the database
                let uid = user.uid
                let userInfo = await firestore.collection('users').doc(uid).get()
                userInfo = userInfo.data()
                userInfo.uid = uid
                setUserInfo(userInfo)
                resolve({loggedIn: true})
            }
            
            
         }else{
            // user is not logged in
            resolve({loggedIn : false})
         }
     })
})