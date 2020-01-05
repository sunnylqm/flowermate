// Reference: Navigating without the navigation prop https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html
import { NavigationContainerRef } from '@react-navigation/core';
import * as React from 'react';
import { ScreensParamList } from 'types/types';

export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigate<T extends keyof ScreensParamList>(name: T, params?: ScreensParamList[T]) {
  navigationRef.current && navigationRef.current.navigate(name, params);
}

export function goBack() {
  navigationRef.current && navigationRef.current.goBack();
}

export function navDispatch(params: any = {}) {
  navigationRef.current && navigationRef.current.dispatch(params);
}
