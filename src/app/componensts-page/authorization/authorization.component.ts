import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Store } from '@ngxs/store';
import { SetUser } from 'src/app/store/auth.state';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent {
  loginForm: FormGroup;
  showError = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private store: Store
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      fastJwt: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.apiService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.store.dispatch(new SetUser(response));
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.showError = true;
          this.errorMessage = 'Неверный логин или пароль';
          setTimeout(() => {
            this.showError = false;
          }, 5000);
        }
      });
    }
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }
}
