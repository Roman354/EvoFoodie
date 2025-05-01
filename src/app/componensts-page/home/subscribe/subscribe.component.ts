import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent {
  subscribeForm: FormGroup;
  showSuccessMessage = false;
  image = 'assets/images/check.png';
  constructor(private fb: FormBuilder) {
    this.subscribeForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.subscribeForm.valid) {

      this.showSuccessMessage = true;
      this.subscribeForm.reset();

      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 5000);
    }
  }

  get email() {
    return this.subscribeForm.get('email');
  }

}
