import React from 'react';
import {Provider} from 'react-redux';
import HomeScreen from './src/Screens/Home';
import {store} from './src/Redux';

const App = () => {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
};

export default App;
