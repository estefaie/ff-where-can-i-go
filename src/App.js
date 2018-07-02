import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import get from 'lodash/get';
import MapContainer from './MapContainer';
import Merchant from './Merchant';
import Barcode from './Barcode';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={MapContainer} />
      <Route path="/map" component={MapContainer} />
      <Route path="/earn" component={Barcode} isEarn={true} />
      <Route path="/burn" component={Barcode} isEarn={false} />
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