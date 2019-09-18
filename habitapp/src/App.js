import React from 'react';
import logo from './logo.svg';
import BeforeLogin from './Component/Pages/index'
import {BrowserRouter as Router, Route} from "react-router-dom";


function App() {
  return (
    <Router>
      <div>




      <Route exact path="/" component={BeforeLogin} />



      </div>


    </Router>
  );
}

export default App;
