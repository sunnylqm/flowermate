import produce from 'immer';
import { Action, User, Location } from 'types/types';

export interface DataState {
  user?: User;
  location?: Location;
  token: string;
}
export const initialState: Readonly<DataState> = {
  token: '',
};

export default (originalState = initialState, action: Action) =>
  produce(originalState, (state) => {
    switch (action.type) {
      case 'setUser':
        state.user = action.payload;
        state.token = state.user.token;
        return;
      case 'setLocation':
        state.location = action.payload;
        return;
      case 'logout':
        state.user = undefined;
        state.token = '';
        return;
    }
  });
