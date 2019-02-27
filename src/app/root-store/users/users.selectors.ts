import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UsersState} from './users.reducer';

export const UsersFeatureSelector = createFeatureSelector('users');

export const selectUser = createSelector(
  UsersFeatureSelector,
  (state: UsersState, props) =>  state.users ? state.users.find(user => user.id === props.id) : null
);
