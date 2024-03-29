// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './homepage';
import DetailView from './DetailView';
import Home from './Hame';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/detail/:id" component={DetailView} />
      </Switch>
    </Router>
  );
}

export default App;
