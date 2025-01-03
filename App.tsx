/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Main from './components/Main';


function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}



export default App;
