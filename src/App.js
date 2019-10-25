import React from 'react';
import './App.css';
// import Map from './components/Map/Map';
import FunctionalMap from './components/Map/FunctionalMap';

const App = () => {
  return (
    <div className="App">
      {/* <Map title="My First Map" /> */}
      <FunctionalMap title="My First Map" />
    </div>
  );
};

export default App;
