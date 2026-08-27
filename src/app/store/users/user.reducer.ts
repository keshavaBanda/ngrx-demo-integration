import { createReducer, on } from "@ngrx/store";
import { IUser } from "../../core/models/user.model";
import { addUser, addUserFailure, addUserSuccess, clearSelectedUser, deleteUser, deleteUserFailure, deleteUserSuccess, loadUserById, loadUserByIdFailure, loadUserByIdSuccess, loadUserFailure, loadUsers, loadUserSuccess, updateUser, updateUserFailure, updateUserSuccess } from "./user.actions";

export interface UserState {
  users: IUser[],
  isLoading: boolean,
  error: string | null,
  selectedUser: IUser | null;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: null,
  selectedUser: null
}

export const userReducer = createReducer(
  initialState,
  on(loadUsers, (state) => (
    {
      ...state,
      isLoading: true
    }
  )),

  on(loadUserSuccess, (state, { users }) => (
    {
      ...state,
      users,
      isLoading: false
    }
  )),

  on(loadUserFailure, (state, { error }) => (
    {
      ...state,
      error,
      isLoading: false
    }
  )),

  on(loadUserById, (state) => (
    {
      ...state,
      selectedUser: null,
      isLoading: true,
      error: null,
    }
  )),
  on(loadUserByIdSuccess, (state, { user }) => (
    {
      ...state,
      selectedUser: user,
      isLoading: false,
      error: null,
    }
  )),
  on(loadUserByIdFailure, (state, { error }) => (
    {
      ...state,
      selectedUser: null,
      isLoading: false,
      error,
    }
  )),

  on(addUser, (state) => (
    {
      ...state,
      error: null,
      isLoading: true,
    }
  )),
  on(addUserSuccess, (state, { user }) => (
    {
      ...state,
      users: [user, ...state.users],
      error: null,
      isLoading: false,
    }
  )),
  on(addUserFailure, (state, { error }) => (
    {
      ...state,
      error,
      isLoading: false
    }
  )),

  on(updateUser, (state) => (
    {
      ...state,
      error: null,
      isLoading: true,
    }
  )),
  on(updateUserSuccess, (state, { user }) => (
    {
      ...state,
      users: state.users.map(existingUser => existingUser.id === user.id ? user : existingUser),
      selectedUser: user,
      error: null,
      isLoading: false,
    }
  )),
  on(updateUserFailure, (state, { error }) => (
    {
      ...state,
      error,
      isLoading: false
    }
  )),
  on(clearSelectedUser, (state) => ({
    ...state,
    selectedUser: null
  })),

  on(deleteUser, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(deleteUserSuccess, (state, { id }) => ({
    ...state,

    users: state.users.filter(
      user => user.id !== id
    ),

    loading: false,
    error: null
  })),

  on(deleteUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))


)
