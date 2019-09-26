import axios from "axios";

function Auth() {
  function logIn(username, password, cb) {
    return axios
      .post("/api/authenticate", { username: username, password: password })
      .then(response => {
        localStorage.setItem("token", response.data.token);
        cb(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function logOut(cb) {
    localStorage.removeItem("token");
    cb();
  }

  function getToken() {
    return localStorage.getItem("token");
  }

  function isLoggedIn() {
    //return !!getToken();
    if (localStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  }

  return {
    isLoggedIn,
    logIn,
    logOut,
    getToken
  };
}

export default Auth();
