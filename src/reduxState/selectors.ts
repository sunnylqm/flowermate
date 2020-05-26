import { createSelector } from 'reselect';
import { ReduxState } from 'types/types';

export const selectDataState = (reduxState: ReduxState) => reduxState.dataState;

export const selectUser = createSelector(
  selectDataState,
  (dataState) => dataState.user,
);

export const selectToken = createSelector(
  selectDataState,
  (dataState) => dataState.token,
);

export const selectLocation = createSelector(
  selectDataState,
  (dataState) => dataState.location,
);
