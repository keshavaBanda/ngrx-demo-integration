import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './../../core/services/auth.service';
import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AppState } from '../user/user';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IUser } from '../../core/models/user.model';
import { selectUsers } from '../../store/users/user.selector';
import { loadUsers } from '../../store/users/user.actions';


@Component({
  selector: 'app-dashboard',
  imports: [AsyncPipe, CommonModule, RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  store = inject(Store<AppState>)
  users$: Observable<IUser[]> = this.store.select(selectUsers);
  router =  inject(Router);
  ngOnInit(){
    this.store.dispatch(loadUsers())
  }

  goToUser(){
    this.router.navigateByUrl('user')
  }


}
