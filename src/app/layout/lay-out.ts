import { Component, inject, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { MatButton, MatButtonModule } from '@angular/material/button';

const MENU_ITEMS = [
  {
    icon: 'dashboard',
    name: 'Dashboard',
    link: '/dashboard'
  },
  {
    icon: 'people',
    name: 'User',
    link: '/user'
  },
]

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    MatIcon,
    MatSidenavContainer,
    MatToolbar,
    MatSidenavContent,
    MatNavList,
    MatSidenav,
    MatButtonModule
  ],
  templateUrl: './lay-out.html',
  styleUrl: './lay-out.scss',
})
export class LayOut {
  isCollapsed = signal(false)
  authService = inject(AuthService)
  router = inject(Router)
  items = MENU_ITEMS;

  toggleSidebar() {
    this.isCollapsed.update((value) => !value)
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }


}
