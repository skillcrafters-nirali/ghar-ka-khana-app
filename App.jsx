import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'react-redux';
import {store} from './src/store';


const App = () => {
  return (
    <Provider store={store}>
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
    </Provider>
  );
};

export default App;