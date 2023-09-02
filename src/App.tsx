import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/sort-reducer';
import { Sorting } from './components/sorting/Sorting';
import FlightsContainer from './components/flights/Flights';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className='app-wrapper'>
        <Sorting />
        <FlightsContainer />
      </div>
    </Provider>
  );
};

export default App;
