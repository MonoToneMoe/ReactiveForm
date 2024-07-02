import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { response } from 'express';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {

  signupForm!: FormGroup
  showToast: boolean = false;
  toastMessage: string = '';
  isError: boolean = false;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(15), passwordValidator]],
      passwordGroup: this.formBuilder.group({
        password: ['', Validators.required, Validators.minLength(15), passwordValidator],
        confirmPassword: ['', Validators.required]
      }, { validator: passwordMatchValidator }),
      isAdmin: [false]
    })
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control: AbstractControl) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  submitForm() {
    if(this.signupForm.invalid){
      this.markFormGroupTouched(this.signupForm);
      this.toastMessage = 'Fix errors on form';
      this.isError = true;
      this.showToast = true;
      setTimeout(() => this.showToast = false, 3000);
    } else {
      this.dataService.AddUser(this.signupForm.value).subscribe(
        response => {
          this.toastMessage = 'Account created.';
          this.isError = false;
          this.showToast = true;
          setTimeout(() => this.showToast = false, 3000);
          this.signupForm.reset
          this.router.navigate(['/login'])
        },
        error => {
          this.toastMessage = 'Error sending message.';
          this.isError = true;
          this.showToast = true;
          setTimeout(() => this.showToast = false, 3000);
          console.error('Error:', error);
        }
      )
    }
  }
}

function passwordValidator(control: FormControl): { [key: string]: boolean } | null {
  const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[?!@#$%^&*])[A-Za-z\d?!@#$%^&*]{15,}$/;
  if (!PASSWORD_REGEX.test(control.value)) {
    return { 'invalidPassword': true };
  }
  return null;
}
function passwordMatchValidator(control: FormGroup): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { 'passwordMismatch': true };
  }
  return null;
}