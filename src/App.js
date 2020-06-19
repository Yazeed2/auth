import React,{useEffect, useState} from 'react';
import './App.css';
import {Switch, Route, Link} from 'react-router-dom'
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';
import Home from './components/home/Home'
import {signOut} from './firebase/auth'
import {connect} from 'react-redux'
import {setUserInfoAction} from './components/auth/authActions'
import {auth, firestore} from './firebase/firebase'
import Loading from './components/loading/Loading';

const mapState = (state) =>({...state})
const actions = { 
  setUserInfoAction
}

function App(props) {
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setLoggedIn] = useState(false)
  useEffect(async() => {

    auth.onAuthStateChanged(async(user)=>{ 
      if(user){
         // user is logged in 
         // check if the global store has a user and fetch the data if not 
        setLoggedIn(true)
        setLoading(false)
         if(props.auth.userInfo){
             // userInfo is saved in the global state
         }else{
             // get user data from the database
             let uid = user.uid
             let userInfo = await firestore.collection('users').doc(uid).get()
             userInfo = userInfo.data()
             userInfo.uid = uid
             props.setUserInfoAction(userInfo)
         }
         
         
      }else{
         // user is not logged in
        setLoading(false)
        setLoggedIn(false)
        
      }
  })
  }, []) 
  return (
    <>
    {loading? <Loading/> : 
    
    <div className="App">
      
     <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {isLoggedIn?
            <button onClick={()=>signOut(props.setUserInfoAction)}>logout</button>
            :
            <>
            <li>
              <Link to="/login">login</Link>
            </li>
            <li>
              <Link to="/register">register</Link>
            </li>
            </>
            }
            
          </ul>
          </nav>
     <Switch>
      
     <Route path='/login'> <Login/> </Route>
     <Route path='/register'> <Register/> </Route>
     <Route path='/'> <Home/> </Route>


    
     </Switch>
    </div>}
    </>
  );
}

export default connect(mapState, actions)(App);
