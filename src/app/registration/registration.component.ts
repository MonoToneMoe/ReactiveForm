import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {

  signupForm!: FormGroup

  constructor(private formBuilder: FormBuilder, private dataService: DataService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(15), passwordValidator]],
      passwordGroup: this.formBuilder.group({
        password: ['', Validators.required, Validators.minLength(15), passwordValidator],
        confirmPassword: ['', Validators.required]
      }, { validator: passwordMatchValidator }),
      address: ['', [Validators.maxLength(100)]],
      phoneNumber: ['', [phoneValidator]],
      firstname: ['', [Validators.required, Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.maxLength(100)]],
      birthDay: ['', [Validators.required, dateValidator]],
      isAdmin: [false]
    })
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
function phoneValidator(control: any): { [key: string]: boolean } | null {
  const PHONE_REGEX = /^\(\d{3}\) \d{3}-\d{4}$/;
  if (!PHONE_REGEX.test(control.value)) {
    return { 'invalidPhone': true };
  }
  return null;
}

function dateValidator(control: FormControl): { [key: string]: boolean } | null {
  const today = new Date();

  const selectedDate = new Date(control.value);

  // Compare dates
  if (selectedDate > today) {
    return { 'futureDate': true };
  }
  return null;
}
