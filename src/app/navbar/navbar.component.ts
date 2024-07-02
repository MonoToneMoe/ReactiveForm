import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router) { }

  navigateToUserForm(): void {
    this.router.navigate([`/userform`]);
  }

  navigateToStudentDirectory(): void {
    this.router.navigate([`/student-directory`]);
  }

  navigateToUserManagement(): void {
    this.router.navigate([`/user-management`]);
  }

}
