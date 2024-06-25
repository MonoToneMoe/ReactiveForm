import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators, FormBuilder } from '@angular/forms';
import { initFlowbite } from 'flowbite';

function dateValidator(control: FormControl): { [key: string]: boolean } | null {
  const today = new Date();

  const selectedDate = new Date(control.value);

  // Compare dates
  if (selectedDate > today) {
    return { 'futureDate': true };
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

  formatPhoneNumber(event: any) {
    let input = event.target.value.replace(/\D/g, '').substring(0, 10);
    const area = input.substring(0, 3);
    const middle = input.substring(3, 6);
    const last = input.substring(6, 10);

    if (input.length > 6) {
      event.target.value = `(${area}) ${middle}-${last}`;
    } else if (input.length > 3) {
      event.target.value = `(${area}) ${middle}`;
    } else if (input.length > 0) {
      event.target.value = `(${area}`;
    }

    this.userForm.get('phone')?.setValue(event.target.value, { emitEvent: false });
  }

  allowOnlyNumbers(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  submitForm() {
    if(this.userForm.invalid) {
      alert('Fix errors on form');
    } else {
      alert('Success');
        console.log(this.userForm.value);
      this.userForm.reset();
    }
  }
}
