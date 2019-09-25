import React, { Component } from 'react';
import BeforeLogin from './Component/Pages/index'
import ProtectedRoute from './Component/Pages/ProtectedRoute'
import LoggedIn from './Component/Pages/loggedIn'
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserContext from "./context/UserContext";
import authenticatedAxios from "./utils/AuthenticatedAxios";


class App extends Component {

  state = {
    user: null
  }

  setUser = (user) => {
    this.setState({ user });
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      authenticatedAxios
        .get("/api/me")
        .then(response => {
          console.log('****', response)
          this.setUser(response.data)
        });
    }
  }

  render() {
    const { user } = this.state;
    const setUser = this.setUser;


    return (
      <Router>
        <div>

          <UserContext.Provider
            value={{
              user: user,
              setUser: setUser
            }}
          >
            <ProtectedRoute exact path="/" component={BeforeLogin} />
            <Route exact path="/login" component={LoggedIn} />
          </UserContext.Provider>
        </div>
      </Router>
    );
  }

}

export default App;
