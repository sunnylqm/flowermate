import AsyncStorage from '@react-native-community/async-storage';
import * as reducers from 'reduxState/reducers';
import { combineReducers, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { devToolsEnhancer } from 'redux-devtools-extension';

export const reducer = combineReducers({
  uiState: reducers.uiStateReducer,
  dataState: persistReducer(
    {
      key: 'dataState',
      storage: AsyncStorage,
      blacklist: ['location', 'mapLocation'],
    },
    reducers.dataStateReducer,
  ),
  settingsState: reducers.settingsStateReducer,
});
const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['dataState'],
  },
  reducer,
);
export const ReduxStore = createStore(persistedReducer, devToolsEnhancer({}));

export const persistor = persistStore(ReduxStore);
