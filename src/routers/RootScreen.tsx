import React from 'react';
import { NavigationNativeContainer } from '@react-navigation/native';
import { navigationRef } from 'utils/navigationService';
import MainStackNavigator from './MainStackNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import { useSelector } from 'react-redux';
import { selectToken } from 'reduxState/selectors';

function RootScreen() {
  const token = useSelector(selectToken);
  return (
    <NavigationNativeContainer ref={navigationRef}>
      {token ? (
        <MainStackNavigator />
      ) : (
        <AuthStackNavigator />
      )}
    </NavigationNativeContainer>
  );
}

export default RootScreen;
