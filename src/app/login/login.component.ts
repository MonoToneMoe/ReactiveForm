import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators, FormBuilder } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { Router } from '@angular/router';
import { error } from 'console';
import { DataService } from '../data.service';
import { response } from 'express';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  showToast: boolean = false;
  toastMessage: string = '';
  isError: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private dataService: DataService) { }


  navigateToResetPassword(): void {
    this.router.navigate([`/reset-password`]);
  }
  navigateToSignUp(): void {
    this.router.navigate([`/signup`]);
  }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  };

  submitLogin() {
    if (this.loginForm.valid) {
      this.dataService.Login(this.loginForm.value).subscribe(
        response => {
          this.router.navigate(["/userform"])
        },
        error => {
          this.toastMessage = 'Email or Password is incorrect.';
          this.isError = true;
          this.showToast = true;
          setTimeout(() => this.showToast = false, 3000);
        }
      )
    }
  }


}
