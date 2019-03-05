import {User} from '../../models/user.model';
import {ProtegesActionTypes, ProtegesActionUnion} from './proteges.actions';

export interface ProtegesState {
  proteges: User[];
}

const initialState: ProtegesState = {
  proteges: null
};

export function protegesReducer(state = initialState, action: ProtegesActionUnion): ProtegesState {
  switch (action.type) {

    case ProtegesActionTypes.UPDATE_PROTEGES: {
      return {
        ...state,
        proteges: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
