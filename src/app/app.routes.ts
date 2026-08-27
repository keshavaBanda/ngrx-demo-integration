import { PageNotFound } from './shared/components/page-not-found/page-not-found';
import { UserAdd } from './features/user/user-add/user-add';
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then((m) => m.Login),
  },

  {
    path: '',
    loadComponent: () => import('./layout/lay-out').then(m => m.LayOut),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard),
        canActivate: [authGuard]
      },
      {
        path: 'user',
        loadComponent: () => import('./features/user/user').then((m) => m.User),
        canActivate: [authGuard],
      },
      {
        path: 'user/add',
        loadComponent: () => import('./features/user/user-add/user-add').then(m => m.UserAdd)
      },
      {
        path: 'user/edit/:id',
        loadComponent: () => import('./features/user/user-add/user-add').then((m) => m.UserAdd)
      },
      {
        path: '404',
        loadComponent: () => import('./shared/components/page-not-found/page-not-found').then(m => m.PageNotFound)
      },
      {
        path: '**',
        redirectTo: '404',
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
