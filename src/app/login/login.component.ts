import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators, FormBuilder } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router) { }


  navigateToResetPassword(): void {
    this.router.navigate([`/reset-password`]);
  }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: [''],
      password: [''],
    });
  };

  Login() {
    if(this.loginForm.invalid) {
      alert('Fix errors on form');
    } else {
      alert('Success');
        console.log(this.loginForm.value);
      this.loginForm.reset();
      this.router.navigate([`/userform`]);
    }
  }


}
