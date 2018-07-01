import React from 'react';

const barcode = (isEarn, merchantName) => (
  <div>
    <div>Use this barcode to {isEarn ? 'Earn' : 'Redeem' } from {merchantName}</div>
    <div>The barcode</div>
  </div>
);

export default barcode;