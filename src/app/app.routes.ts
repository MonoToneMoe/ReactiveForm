import { Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { StudentDirectoryComponent } from './student-directory/student-directory.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './auth.guard';  // Import the AuthGuard

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'userform', component: UserFormComponent, canActivate: [AuthGuard] },
    { path: 'signup', component: RegistrationComponent },
    { path: 'login', component: LoginComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'student-directory', component: StudentDirectoryComponent, canActivate: [AuthGuard] },
    { path: 'user-management', component: UserManagementComponent, canActivate: [AuthGuard] },
  ];