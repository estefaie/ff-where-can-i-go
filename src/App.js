import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MapContainer from './MapContainer';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={MapContainer} />
      <Route path="/map" component={MapContainer} />
    </div>
  </Router>
);

export default App;