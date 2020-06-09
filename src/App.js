import React from 'react';
import {Switch, Route, Link} from 'react-router-dom'
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';

function App() {
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
      
     <Route path='/login' render={Login} />
     <Route path='/register' render={Register} />

    
     </Switch>
    </div>
  );
}

export default App;
