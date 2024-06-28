import { Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { LandingComponent } from './landing/landing.component';

export const routes: Routes = [
    { path: '', redirectTo: 'userform', pathMatch: 'full' },
    { path: 'userform', component: UserFormComponent },
    {path: 'landing', component: LandingComponent}
  ];
