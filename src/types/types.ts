export { Dispatch } from 'redux';
export { Action } from 'reduxState/actions';
import { DataState } from 'reduxState/reducers/dataStateReducer';
import { SettingsState } from 'reduxState/reducers/settingsStateReducer';
import { UIState } from 'reduxState/reducers/uiStateReducer';
export { UIState, DataState, SettingsState };

import { MainStackParamList } from 'routers/MainStackNavigator';
import { TabParamList } from 'routers/TabNavigator';
import { AuthStackParamList } from 'routers/AuthStackNavigator';

export type ScreensParamList = MainStackParamList &
  TabParamList &
  AuthStackParamList;

interface WithTimeStamp {
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ReduxState {
  uiState: UIState;
  dataState: DataState;
  settingsState: SettingsState;
}

export interface User extends WithTimeStamp {
  id: number;
  avatar?: number;
  username: string;
  email: string;
  token: string;
}

export interface FeedLike extends WithTimeStamp {
  id: number;
  userId: number;
}

export interface Feed extends WithTimeStamp {
  id: string;
  images?: number[];
  desc?: string;
  feedLikes?: FeedLike[];
  user: User;
}

export interface Location {
  lat: number;
  lon: number;
}

export interface MapLocation extends Location {
  latDelta: number;
  lonDelta: number;
}

export interface ReportResult {
  name: string;
  score: number;
  baike_info: {
    baike_url?: string;
    image_url?: string;
    description?: string;
  };
  user?: User;
}

export type ReportType = 'plant';
export interface Report extends WithTimeStamp {
  id: string;
  image: number;
  desc: string;
  extra?: ReportResult;
  user: User;
  type: ReportType;
  lat: number;
  lon: number;
}
