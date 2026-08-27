import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addUser, addUserFailure, addUserSuccess, deleteUser, deleteUserFailure, deleteUserSuccess, loadUserById, loadUserByIdFailure, loadUserByIdSuccess, loadUsers, loadUserSuccess, updateUser, updateUserFailure, updateUserSuccess } from "./user.actions";
import { catchError, EMPTY, exhaustMap, map, of, tap } from "rxjs";
import { UserService } from "../../features/user/user.service";
import { IUser, IUserDTO } from "../../core/models/user.model";


@Injectable({
  providedIn: 'root'
})
export class UserEffects {
  actions$ = inject(Actions)
  userService = inject(UserService)

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadUsers),
      exhaustMap(() =>
        this.userService.getUser().pipe(
          map((users) => (
            loadUserSuccess({ users })
          )),
          catchError(() => EMPTY)
        )
      )
    )
  })

  addUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addUser),

      exhaustMap(({ user }) =>
        this.userService.addUser(user).pipe(
          map((user) => addUserSuccess({ user })),
          catchError((error) => of(addUserFailure({ error: error.message })))
        )
      )
    )
  })

  loadUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserById),

      exhaustMap(({ id }) =>
        this.userService.getUserById(id).pipe(
          map(user =>
            loadUserByIdSuccess({ user })
          ),

          catchError(error =>
            of(
              loadUserByIdFailure({
                error: error.message
              })
            )
          )
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(

      ofType(updateUser),

      exhaustMap(({ id, user }) =>
        this.userService.updateUser(id, user).pipe(

          map(updatedUser =>
            updateUserSuccess({
              user: updatedUser
            })
          ),

          catchError(error =>
            of(
              updateUserFailure({
                error: error.message
              })
            )
          )

        )
      )

    )
  );

  deleteUser$ = createEffect(() =>
  this.actions$.pipe(

    ofType(deleteUser),

    exhaustMap(({ id }) =>
      this.userService.deleteUser(id).pipe(

        map(() =>
          deleteUserSuccess({ id })
        ),

        catchError(error =>
          of(
            deleteUserFailure({
              error: error.message
            })
          )
        )

      )
    )

  )
);

}
