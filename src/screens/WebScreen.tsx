import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { RouteProp } from '@react-navigation/native';
import { ScreensParamList } from '@/types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type WebScreenNavigationProp = NativeStackNavigationProp<
  ScreensParamList,
  'WebScreen'
>;
type WebScreenRouteProp = RouteProp<ScreensParamList, 'WebScreen'>;
interface Props {
  navigation: WebScreenNavigationProp;
  route: WebScreenRouteProp;
}
export default function WebScreen({ route }: Props) {
  const uri = route.params.uri.replace('http:', 'https:');
  return (
    <WebView
      style={styles.container}
      source={{ uri }}
      startInLoadingState={true}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
