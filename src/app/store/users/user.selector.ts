import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.reducer";

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectIsLoading = createSelector(
  selectUserState,
  state => state.isLoading
)

export const selectUsers = createSelector(
  selectUserState,
  state => [...state.users].reverse()
)

export const selectSelectedUser = createSelector(
  selectUserState,
  state => state.selectedUser
)


export const selectError = createSelector(
  selectUserState,
  state => state.error
)


