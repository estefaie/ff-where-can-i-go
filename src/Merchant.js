import React from 'react';
import { Link } from 'react-router-dom';
import locations from './locations';

const Merchant = ({merchantId}) => {
  const loc = locations.find((el) => el.merchantId == merchantId);
  console.log('loc', loc);
  return (
    <div>
      <Link to='/map'>Back</Link>
      <h1>{loc.name}</h1>
      <div>{loc.website}</div>
      <img
        src={`http://ff-where-can-i-go.s3-website-ap-southeast-2.amazonaws.com/img/${merchantId}.png`}
        alt="Smiley face"
      />
    </div>
  );
}

export default Merchant;