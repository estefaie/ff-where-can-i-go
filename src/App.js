import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import get from 'lodash/get';
import MapContainer from './MapContainer';
import Merchant from './Merchant';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={MapContainer} />
      <Route path="/map" component={MapContainer} />
      <Route
        path="/merchant/:merchantId"
        component={p => (
          <Merchant merchantId={get(p, 'match.params.merchantId')} />
        )}
      />
    </div>
  </Router>
);

export default App;