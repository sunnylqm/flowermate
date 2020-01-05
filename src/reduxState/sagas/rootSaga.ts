import { fork } from 'redux-saga/effects';
import * as cameraSaga from './cameraSaga';

const combinedSagas = [cameraSaga];

function* rootSaga() {
  for (const sagas of combinedSagas) {
    for (const saga of Object.values(sagas)) {
      yield fork(saga);
    }
  }
}

export default rootSaga;
