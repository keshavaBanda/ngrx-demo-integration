import { Component, DestroyRef, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IUser, IUserDTO, UserRole } from '../../../core/models/user.model';
import { addUser, addUserSuccess, clearSelectedUser, loadUserById, loadUsers, updateUser, updateUserSuccess } from '../../../store/users/user.actions';
import { Actions, ofType } from '@ngrx/effects';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { selectSelectedUser, selectUsers } from '../../../store/users/user.selector';
import { MatAnchor, MatButtonModule } from "@angular/material/button";
import { MatInputModule } from '@angular/material/input';
import { NoLeadingSpaceDirective } from '../../../shared/directives/nospace.directive';
import { duplicateEmailValidator } from '../../../shared/custom-validators/duplicate-email.validator';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatAnchor,
    MatButtonModule,
    MatInputModule,
    NoLeadingSpaceDirective
  ],
  templateUrl: './user-add.html',
  styleUrl: './user-add.scss'
})
export class UserAdd {

  private fb = inject(FormBuilder);
  private store = inject(Store);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private actions$ = inject(Actions);
  private destroyRef = inject(DestroyRef);

  private users = toSignal(this.store.select(selectUsers), {
    initialValue: []
  })

  userId: string | null = null;
  isEditMode = false;


  userForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        duplicateEmailValidator(
          () => this.users(),
          () => this.selectedUser()?.id
        )
      ]
    ],
    role: ['tech' as UserRole, Validators.required]
  });

  selectedUser = this.store.selectSignal(selectSelectedUser);


  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userId = id;
      this.isEditMode = true;
      this.loadUser(this.userId);
    } else {
      this.isEditMode = false;
      this.store.dispatch(clearSelectedUser());
    }

    this.actions$
      .pipe(
        ofType(loadUsers, addUserSuccess, updateUserSuccess),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.router.navigate(['/user']);
      });

    effect(() => {
      const user = this.selectedUser();
      if (user) {
        this.userForm.patchValue(user);
      }
    })
  }

  loadUser(id: string) {
    this.store.dispatch(loadUserById({ id }));
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const user: IUserDTO = this.userForm.getRawValue();

    if (this.isEditMode && this.userId !== null) {
      this.store.dispatch(
        updateUser({
          id: this.userId,
          user
        })
      );
    } else {
      this.store.dispatch(
        addUser({ user })
      );

    }
  }

  onCancel(): void {
    this.userForm.reset();
    this.store.dispatch(clearSelectedUser())
    this.router.navigate(['/user']);
  }
}
