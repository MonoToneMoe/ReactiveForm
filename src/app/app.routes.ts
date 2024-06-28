import { Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

export const routes: Routes = [
    { path: '', redirectTo: 'userform', pathMatch: 'full' },
    { path: 'userform', component: UserFormComponent },
    { path: 'login', component: LoginComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
  ];
