import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userState: 'guest' | 'registered' | 'admin' = 'guest';
  user: any = null;

  constructor(private router: Router, private store: Store) {}

  login() {

    this.router.navigate(['/authorization']);

  }

  logout() {

    this.userState = 'guest';
    this.user = { firstName: '', lastName: '', role: '' };
    this.router.navigate(['/']);
  }

  setAdmin() {
    this.userState = 'admin';
    this.user = { firstName: 'Админ', lastName: 'Админов', role: 'Admin' };
  }

  ngOnInit() {
    this.user = this.store.selectSnapshot(state => state.auth.user);
    console.log("NAVBAR-USER",this.user);

    this.store.select(state => state.auth.user).subscribe(user => {
      if (user) {
        this.userState = user.role;
        // console.log(user.jwtToken);
        // console.log(user.role,);

      }
    });
  }
}
