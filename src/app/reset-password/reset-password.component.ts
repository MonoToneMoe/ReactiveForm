import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators, FormBuilder } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})

export class ResetPasswordComponent implements OnInit {

  resetPasswordForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router) { }



  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      email: [''],
      old_password: [''],
      new_password: [''],
      confirm_new_password: [''],
    });
  };

  submitForm() {
    if(this.resetPasswordForm.invalid) {
      alert('Fix errors on form');
    } else {
      alert('Success');
        console.log(this.resetPasswordForm.value);
      this.resetPasswordForm.reset();
    }
  }
  
}
