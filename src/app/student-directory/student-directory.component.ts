import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-student-directory',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './student-directory.component.html',
  styleUrl: './student-directory.component.css'
})
export class StudentDirectoryComponent {

}
