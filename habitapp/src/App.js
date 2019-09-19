import React from 'react';
import BeforeLogin from './Component/Pages/index'
import loggedIn from './Component/Pages/loggedIn'
import {BrowserRouter as Router, Route} from "react-router-dom";


function App() {
  return (
    <Router>
      <div>




      <Route exact path="/" component={BeforeLogin} />
      <Route exact path="/login" component={loggedIn} />



      </div>


    </Router>
  );
}

export default App;
