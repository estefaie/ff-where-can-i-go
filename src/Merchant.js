import React, { Component } from 'react';

class Merchant extends Component {
  constructor() {
    super();
  }

  render(){
    return <h1>Merchant{this.props.merchantId}</h1>;
  }
}

export default Merchant;