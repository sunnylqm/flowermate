import AsyncStorage from '@react-native-community/async-storage';
import * as reducers from 'reduxState/reducers';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'reduxState/sagas/rootSaga';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();

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
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

export const persistor = persistStore(ReduxStore);

sagaMiddleware.run(rootSaga);
