import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      firstName: [''],
      lastName: [''],
      middleName: ['']
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.apiService.register(this.registrationForm.value).subscribe({
        next: (value) => {
          alert('Регистрация успешна!');

          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Ошибка регистрации:', error);
        }
      });
    }
  }


  get username() { return this.registrationForm.get('username'); }
  get password() { return this.registrationForm.get('password'); }
}
