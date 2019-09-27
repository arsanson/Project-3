import React, { Component } from "react";
import BeforeLogin from "./Component/Pages/index";
import ProtectedRoute from "./Component/Pages/ProtectedRoute";
import LoggedIn from "./Component/Pages/loggedIn";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserContext from "./context/UserContext";
import authenticatedAxios from "./utils/AuthenticatedAxios";

class App extends Component {
  state = {
    user: null,
    spotifyId: ""
  };

  setUser = user => {
    console.log("user", user);
    this.setState({ user });
  };

  setSpotifyId = id => {
    console.log("id", id);
    this.setState({ spotifyId: id });
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      authenticatedAxios.get("/api/me").then(response => {
        console.log("****", response);
        this.setUser(response.data);
      });
    }
  }

  render() {
    const { user } = this.state;
    const setUser = this.setUser;
    const spotifyId = this.spotifyId;
    const setSpotifyId = this.setSpotifyId;

    return (
      <Router>
        <div>
          <UserContext.Provider
            value={{
              user: user,
              setUser: setUser,
              spotifyId: spotifyId,
              setSpotifyId: setSpotifyId
            }}
          >
            <ProtectedRoute exact path="/login" component={LoggedIn} />
            <Route exact path="/" component={BeforeLogin} />
          </UserContext.Provider>
        </div>
      </Router>
    );
  }
}

export default App;
