import { createAction, props } from "@ngrx/store";
import { IUser, IUserDTO } from "../../core/models/user.model";

//Load Users Actions
export const loadUsers = createAction(
  '[Users] Load Users'
)

export const loadUserSuccess = createAction(
  '[Users] Load Users Success',
  props<{users: IUser[]}>()
)

export const loadUserFailure = createAction(
  '[Users] Load Users Failure',
  props<{error: string}>()
)

//Load Single User Actions
export const loadUserById = createAction(
  '[User] Load User By Id',
  props<{ id: string }>()
);

export const loadUserByIdSuccess = createAction(
  '[User] Load User By Id Success',
  props<{ user: IUser }>()
);

export const loadUserByIdFailure = createAction(
  '[User] Load User By Id Failure',
  props<{ error: string }>()
);

//add Users Actions
export const addUser = createAction(
  '[User] Add User',
  props<{ user: IUserDTO }>()
);

export const addUserSuccess = createAction(
  '[User] Add User Success',
  props<{ user: IUser }>()
);

export const addUserFailure = createAction(
  '[User] Add User Failure',
  props<{ error: string }>()
);

//Update User Actions
export const updateUser = createAction(
  '[User] Update User',
  props<{ id: any, user: IUserDTO }>()
);

export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ user: IUser }>()
);

export const updateUserFailure = createAction(
  '[User] Update User Failure',
  props<{ error: string }>()
);

//clear form
export const clearSelectedUser = createAction(
  '[User] Clear Selected User'
);

//delete User Actions
export const deleteUser = createAction(
  '[User] Delete User',
  props<{ id: string }>()
);

export const deleteUserSuccess = createAction(
  '[User] Delete User Success',
  props<{ id: string }>()
);

export const deleteUserFailure = createAction(
  '[User] Delete User Failure',
  props<{ error: string }>()
);

