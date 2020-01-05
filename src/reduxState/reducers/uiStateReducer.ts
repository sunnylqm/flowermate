import produce from 'immer';
import { Action } from 'types/types';

export interface UIState {}
export const initialState: Readonly<UIState> = {};

export default (originalState = initialState, action: Action) =>
  produce(originalState, state => {
    switch (action.type) {
    }
  });
