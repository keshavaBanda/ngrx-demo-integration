import { Component, inject, signal, ViewChild } from '@angular/core';
import { UserState } from '../../store/users/user.reducer';
import { Store } from '@ngrx/store';
import { deleteUser, loadUsers } from '../../store/users/user.actions';
import { Observable } from 'rxjs';
import { selectUsers } from '../../store/users/user.selector';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { IUser } from '../../core/models/user.model';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';


export interface AppState {
  users: UserState;
}

@Component({
  selector: 'app-user',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatButtonModule
  ],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User {

  store = inject(Store<AppState>)
  router = inject(Router)
  users$: Observable<IUser[]> = this.store.select(selectUsers);
  showFiller = signal(false);

  userDataSource = new MatTableDataSource<IUser>();

  displayedColumns = [
    'id',
    'username',
    'email',
    'role',
    'star'
  ];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  ngOnInit() {
    this.store.dispatch(loadUsers())
  }

  ngAfterViewInit() {
    this.userDataSource.paginator = this.paginator;
    this.users$.subscribe({
      next: (users: IUser[]) => this.userDataSource.data = users,
    })
  }

  /**
   *
   * For this simple CRUD application, /user and /user/add are defined as sibling routes
   *  to keep the routing structure simple and easy to maintain.
   *  In a larger application, if Add User is treated as a child feature of User,
   *  we can use nested routes with an additional <router-outlet> inside the User component.
   */
  onAddUser() {
    this.router.navigate(['/user/add'])
  }

  onEditUser(user: IUser) {
    this.router.navigate(['user/edit', user.id])
  }

  onDeleteUser(user: IUser): void {

    if (!user.id) return;

    const confirmed = confirm(
      `Are you sure you want to delete ${user.username}?`
    );

    if (!confirmed) return;

    this.store.dispatch(
      deleteUser({
        id: user.id
      })
    );
  }

}
