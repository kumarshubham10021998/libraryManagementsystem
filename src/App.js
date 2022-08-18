import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import axios from 'axios';

import Login from './Login';
import Dashboard from './Dashboard';
import Home from './Home';

import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';
import AddBook from './AddBook';
import Edit from './Edit';
import Users from './Users';
import Registration from './Registration';
import Booklist from './Booklist';

function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios.get(`http://powerful-temple-78847.herokuapp.com/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="header">
            {/* <NavLink exact activeClassName="active" to="/">Home</NavLink> */}
            <NavLink activeClassName="active" to="/admin-login">Admin</NavLink>
            <NavLink className="d-flex justify-content-end mt--0" activeClassName="active" to="/user-login">User Login</NavLink>
            <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink>
            
            <NavLink className='btn btn-success fs-bold text-light ms-2 ' activeClassName="active" to="/addbook">Add New Book</NavLink> 
          </div>
          <div className="content">
            <Switch>
              {/* <Route exact path="/" component={Home} /> */}
              <PublicRoute path="/admin-login" component={Login} />
              <PublicRoute path="/user-login" component={Users} />
              <PublicRoute path="/registration" component={Registration} />
            
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/users" component={Users} /> 
              <PrivateRoute path="/addbook" component={AddBook} />
              <PrivateRoute path="/users/edit/:id" component={Edit} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
