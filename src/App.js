import React,{useEffect} from 'react';
import {Switch, Route, Link} from 'react-router-dom'
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';
import Home from './components/home/Home'
import {onAuthStateChange} from './firebase/auth'
import {connect} from 'react-redux'
import {setUserInfoAction} from './components/auth/authActions'

const mapState = (state) =>({...state})
const actions = { 
  setUserInfoAction
}

function App(props) {
  useEffect(() => {
    onAuthStateChange(props.setUserInfoAction, props.auth)
  }, [])
  return (
    <div className="App">
     <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">login</Link>
            </li>
            <li>
              <Link to="/register">register</Link>
            </li>
          </ul>
          </nav>
     <Switch>
      
     <Route path='/login'> <Login/> </Route>
     <Route path='/register'> <Register/> </Route>
     <Route path='/'> <Home/> </Route>


    
     </Switch>
    </div>
  );
}

export default connect(mapState, actions)(App);
