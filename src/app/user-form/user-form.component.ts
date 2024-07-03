import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators, FormBuilder } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { IGetAllFormUsers } from '../interfaces';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

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

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  showToast: boolean = false;
  toastMessage: string = '';
  isError: boolean = false;
  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router) { }

  ngOnInit() {
    const token = localStorage.getItem('Token');
    if (!token) {
      // Navigate to a different route if the user is already logged in
      this.router.navigate(['/login']);
    }
    this.userForm = this.formBuilder.group({
      fName: ['', [Validators.required, Validators.maxLength(100)]],
      lName: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', [Validators.required, dateValidator]],
      address: ['', Validators.maxLength(100)],
      phone: ['', phoneValidator],
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

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control: AbstractControl) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  submitForm() {
    if (this.userForm.invalid) {
      this.markFormGroupTouched(this.userForm);
      this.toastMessage = 'Fix errors on form';
      this.isError = true;
      this.showToast = true;
      setTimeout(() => this.showToast = false, 3000);
    } else {
      this.dataService.AddForm(this.userForm.value).subscribe(
        response => {
          this.toastMessage = 'Message sent successfully.';
          this.isError = false;
          this.showToast = true;
          setTimeout(() => this.showToast = false, 3000);
          this.userForm.reset();
        },
        error => {
          this.toastMessage = 'Error sending message.';
          this.isError = true;
          this.showToast = true;
          setTimeout(() => this.showToast = false, 3000);
          console.error('Error:', error);
        }
      );
    }
  }
}
