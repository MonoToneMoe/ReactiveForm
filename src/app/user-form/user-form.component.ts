import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators, FormBuilder } from '@angular/forms';

function dateValidator(control: FormControl): { [key: string]: boolean } | null {
  // Get today's date
  const today = new Date();

  // Selected date from form control
  const selectedDate = new Date(control.value);

  // Compare dates
  if (selectedDate > today) {
    return { 'futureDate': true }; // Return validation error if date is in future
  }
  return null; // No validation error
}

function phoneValidator(control: AbstractControl): ValidationErrors | null {
  // Regular expression to match (123) 456-7890 format
  const PHONE_REGEX = /^\(\d{3}\) \d{3}-\d{4}$/;

  // Check if the control value matches the pattern
  if (!PHONE_REGEX.test(control.value)) {
    return { 'invalidPhone': true }; // Return validation error if not matched
  }
  return null; // No validation error
}

function passwordValidator(control: FormControl): { [key: string]: boolean } | null {
  // Regular expression to enforce password policy
  const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[?!@#$%^&*])[A-Za-z\d?!@#$%^&*]+$/;

  // Check if the control value matches the pattern
  if (!PASSWORD_REGEX.test(control.value)) {
    return { 'invalidPassword': true }; // Return validation error if not matched
  }
  return null; // No validation error
}

function passwordMatchValidator(control: FormGroup): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  // Check if passwords are not null and if they match
  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { 'passwordMismatch': true }; // Return validation error if passwords do not match
  }
  return null; // No validation error
}

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {

  userForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      fName: ['', [Validators.required, Validators.maxLength(100)]],
      lName: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      date: ['', [Validators.required, dateValidator]],
      address: ['', Validators.maxLength(100)],
      phone: ['', phoneValidator],
      passwordGroup: this.formBuilder.group({
        password: ['', Validators.required, Validators.minLength(15), passwordValidator],
        confirmPassword: ['', Validators.required]
      }, { validator: passwordMatchValidator })
    });
  };

  submitForm() {
    if(this.userForm.invalid) {
      alert('Fix errors on form');
    } else {
      alert('Succesful!');
       console.log(this.userForm.value);
      this.userForm.reset();
    }
  }
}
