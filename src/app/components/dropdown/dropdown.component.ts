import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Logout } from 'src/app/store/auth.state';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  isOpen = false;
  username = '';

 @Input() userState: any;
  user: any = null;


  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    this.store.select(state => state.auth.user).subscribe(user => {
      if (user) {
        this.username = user.firstName + " " + user.lastName;
      }
    });
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
  }
  logout() {
    this.store.dispatch(new Logout());
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}
