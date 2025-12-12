import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider, useDispatch } from 'react-redux';
import { store } from './src/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { restoreCredentials } from './src/store/authSlice';

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const user = await AsyncStorage.getItem('user');
        console.log('AsyncStorage - Token:',token);
        console.log('AsyncStorage - Token:',user);
        if (token && user) {
          dispatch(restoreCredentials({
            token,
            user: JSON.parse(user)
          }));
          console.log('Token restored successfully');
        }else{
          console.log('No token found in AsyncStorage');
        }
      } catch (error) {
        console.log('Error restoring auth:', error);
      }
    };
    restoreAuth();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
