import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators, FormBuilder } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { DataService } from '../data.service';
import { IAddUser, IGetAllUsers } from '../interfaces';

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

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
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
  fetchData: IGetAllUsers[] | undefined

  userForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAllUsers().subscribe((data: IGetAllUsers[]) => {
      this.fetchData = data;
      console.log(this.fetchData);
    });
    this.userForm = this.formBuilder.group({
      fName: ['', [Validators.required, Validators.maxLength(100)]],
      lName: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      date: ['', [Validators.required, dateValidator]],
      address: ['', Validators.maxLength(100)],
      phone: ['', phoneValidator],
      passwordGroup: this.formBuilder.group({
        password: ['', Validators.required, Validators.minLength(15), passwordValidator],
        confirmPassword: ['', Validators.required]
      }, { validator: passwordMatchValidator }),
      isAdmin: [false]
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
    if (this.userForm.invalid) {
      this.markFormGroupTouched(this.userForm);
      alert('Fix errors on form');
    } else {
      const formData: IAddUser = {
        firstName: this.userForm.value.fName,
        lastName: this.userForm.value.lName,
        email: this.userForm.value.email,
        birthday: this.userForm.value.date,
        address: this.userForm.value.address,
        phoneNumber: this.userForm.value.phone,
        password: this.userForm.value.passwordGroup.password,
        isAdmin: this.userForm.value.isAdmin
      };
      console.log(formData)

      this.dataService.AddUser(formData).subscribe({
        next: (response) => {
          alert('User added successfully');
          console.log(response);
          this.userForm.reset();
        },
        error: (error) => {
          alert('There was an error adding the user');
          console.error(error);
        }
      });
    }
  }
  
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control: AbstractControl) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
