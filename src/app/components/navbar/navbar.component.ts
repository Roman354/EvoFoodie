import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userState: 'guest' | 'registered' | 'admin' = 'guest';

  user = {
    firstName: 'Иван',
    lastName: 'Иванов',
    role: 'User'
  };

  constructor(private router: Router) {}

  login() {
    // Здесь будет логика авторизации
    this.userState = 'registered';
    this.user = { firstName: 'Иван', lastName: 'Иванов', role: 'User' };
  }

  logout() {
      // Здесь будет логика логаута
    this.userState = 'guest';
    this.user = { firstName: '', lastName: '', role: '' };
    this.router.navigate(['/']);
  }

  setAdmin() {
    this.userState = 'admin';
    this.user = { firstName: 'Админ', lastName: 'Админов', role: 'Admin' };
  }
}
