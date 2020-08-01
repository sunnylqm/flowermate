import 'react-native-gesture-handler';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

import { enableScreens } from 'react-native-screens';
enableScreens();

import { setSiblingWrapper } from 'react-native-root-siblings';
import { Provider } from 'react-redux';
import { ReduxStore } from 'reduxState/store';
import React from 'react';

setSiblingWrapper((sibling) => (
  <Provider store={ReduxStore}>{sibling}</Provider>
));

import { LogBox } from 'react-native';
const IGNORED_WARNINGS = [
  '`-[RCTRootView cancelTouches]`',
  'Please update the following components: AnimatedComponent',
  'react-native-update',
  'Require cycle',
];
const oldConsoleWarn = console.warn;
console.warn = (...args: any[]) => {
  if (
    typeof args[0] === 'string' &&
    IGNORED_WARNINGS.some((ignoredWarning) =>
      args[0].startsWith(ignoredWarning),
    )
  ) {
    return;
  }
  return oldConsoleWarn(...args);
};
LogBox.ignoreLogs(IGNORED_WARNINGS);
