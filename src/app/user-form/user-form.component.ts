import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {

  userForm!: FormGroup;
  constructor() { }

  ngOnInit() {
    this.userForm = new FormGroup({
      fName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      lName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      date: new FormControl('', [Validators.required, dateValidator]),
      address: new FormControl(''),
      phone: new FormControl(''),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    });
  }
}
