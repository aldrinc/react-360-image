import React, { Component } from 'react';
import React360 from './React360';
import './App.css';

class App extends Component {

  
  render() {
    // var foo = new Array(36);
    
        
    return (
      <div className="App">
        <React360 dir="awair-360" numImages="55" />
      </div>
    );
  }
}

export default App;
