import React from 'react';
import './App.css';
import BasicRoute from './module/route/BasicRouteConfig';
import { Switch } from 'react-router';


function App() {
  return (
    <div className="App">
      <Switch>
          {BasicRoute}
      </Switch>
    </div>
  );
}

export default App;
