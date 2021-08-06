import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@/screens/LoginScreen';
import RegisterScreen from '@/screens/RegisterScreen';
import React from 'react';

export type AuthStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStackNavigator() {
  return (
    <Navigator screenOptions={{ headerBackTitle: '返回' }}>
      <Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ title: '注册' }}
      />
    </Navigator>
  );
}
