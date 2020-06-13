import React,{useEffect, useState} from 'react';
import {Switch, Route, Link} from 'react-router-dom'
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';
import Home from './components/home/Home'
import {onAuthStateChange} from './firebase/auth'
import {connect} from 'react-redux'
import {setUserInfoAction} from './components/auth/authActions'
import Loading from './components/loading/Loading';

const mapState = (state) =>({...state})
const actions = { 
  setUserInfoAction
}

function App(props) {
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setLoggedIn] = useState(false)
  useEffect(async() => {
    let {loggedIn} = await onAuthStateChange(props.setUserInfoAction, props.auth)
    setLoading(false)
    setLoggedIn(loggedIn)
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
            <li>logout</li>
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
