import AsyncStorage from '@react-native-async-storage/async-storage';
import * as reducers from '@/reduxState/reducers';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';

const middlewares = [];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

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
export const ReduxStore = createStore(
  persistedReducer,
  applyMiddleware(...middlewares),
);

export const persistor = persistStore(ReduxStore);
