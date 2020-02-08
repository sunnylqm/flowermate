import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScreensParamList } from 'types/types';

type WebScreenNavigationProp = StackNavigationProp<
  ScreensParamList,
  'WebScreen'
>;
type WebScreenRouteProp = RouteProp<ScreensParamList, 'WebScreen'>;
interface Props {
  navigation: WebScreenNavigationProp;
  route: WebScreenRouteProp;
}

const scriptToRemoveHeader = `
var headEl = document.querySelector('.rt-head');
var bodyEl = document.querySelector('.rt-body');
if (headEl && bodyEl) {
  var title = document.querySelector('.vf-title').textContent;
  window.ReactNativeWebView.postMessage(title);
  headEl.remove();
  bodyEl.style.paddingTop = 0;
}
`;

export default function WebScreen({ navigation, route }: Props) {
  const uri = route.params.uri.replace('http:', 'https:');
  return (
    <WebView
      style={styles.container}
      source={{ uri }}
      startInLoadingState={true}
      injectedJavaScript={scriptToRemoveHeader}
      onMessage={event => {
        navigation.setParams({ title: event.nativeEvent.data });
        // console.warn(event.nativeEvent.data);
      }}
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
