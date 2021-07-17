import React from "react";
import './App.css';
import Home from './MyComponents/Home';
import Newuser from './MyComponents/Newuser';
import Showuser from './MyComponents/Showuser';
import Edituser from './MyComponents/edituser';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/new" component={Newuser} />
          <Route exact path="/edit/:id" component={Edituser} />
          <Route exact path="/:id" component={Showuser} />   
        </Switch>
      </div>
    </Router>
  );
}

export default App;