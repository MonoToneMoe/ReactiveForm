import { Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { StudentDirectoryComponent } from './student-directory/student-directory.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegistrationComponent } from './registration/registration.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
<<<<<<< HEAD
    { path: 'userform', component: UserFormComponent },
=======
    { path: 'user-form', component: UserFormComponent },
    { path: 'signup', component: RegistrationComponent },
>>>>>>> master
    { path: 'login', component: LoginComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'student-directory', component: StudentDirectoryComponent },
    { path: 'user-management', component: UserManagementComponent },
  ];