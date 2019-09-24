import React, { Component } from 'react';
import BeforeLogin from './Component/Pages/index'
import ProtectedRoute from './Component/Pages/ProtectedRoute'
import loggedIn from './Component/Pages/loggedIn'
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserContext from "./context/UserContext";

class App extends Component {

  state = {
    user: null
  }
  setUser = (user) => {
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    const setUser = this.setUser;


    return (
      <Router>
        <div>



          <UserContext.Provider value={{ setUser, user }}>
            <ProtectedRoute exact path="/" Component={BeforeLogin} />
            <Route exact path="/login" Component={loggedIn} />
          </UserContext.Provider>



        </div>


      </Router>
    );
  }

}

export default App;
