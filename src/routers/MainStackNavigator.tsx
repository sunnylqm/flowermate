import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import ReportListScreen from 'screens/ReportListScreen/ReportListScreen';
import WebScreen from 'screens/WebScreen';
import PostFeedScreen from 'screens/HomeScreen/PostFeedScreen';
import FeedListScreen from 'screens/FeedListScreen/FeedListScreen';
import React from 'react';

export type MainStackParamList = {
  TabNavigator: undefined;
  ReportListScreen: undefined;
  PostFeedScreen: undefined;
  FeedListScreen: { title: string; showMyself?: boolean };
  WebScreen: { title?: string; uri: string };
};

const { Navigator, Screen } = createStackNavigator<MainStackParamList>();

export default function MainStackNavigator() {
  return (
    <Navigator
      screenOptions={{
        headerBackTitle: '返回',
      }}
    >
      <Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="ReportListScreen"
        component={ReportListScreen}
        options={{
          title: '我的鉴定',
        }}
      />
      <Screen
        name="PostFeedScreen"
        component={PostFeedScreen}
        options={{
          title: '发表动态',
        }}
      />
      <Screen
        name="FeedListScreen"
        component={FeedListScreen}
        options={{
          title: '我的动态',
        }}
      />
      <Screen
        name="WebScreen"
        component={WebScreen}
        options={({ route }) => ({
          title: route.params.title || '',
          headerTitleContainerStyle: {
            marginHorizontal: 80,
          },
        })}
      />
    </Navigator>
  );
}
