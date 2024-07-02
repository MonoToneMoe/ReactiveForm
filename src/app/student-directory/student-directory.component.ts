import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule, NgFor } from '@angular/common';
import { DataService } from '../data.service';
import { Student } from '../interfaces';

@Component({
  selector: 'app-student-directory',
  standalone: true,
  imports: [NgFor, CommonModule, NavbarComponent],
  templateUrl: './student-directory.component.html',
  styleUrl: './student-directory.component.css'
})
export class StudentDirectoryComponent implements OnInit {

  dataService = inject(DataService);
  studentList: Student[] | null = null 


  loadStudentData() {
    this.dataService.getStudentData().subscribe((data) => {
      // console.log(list);
      this.studentList = data;
      console.log(this.studentList)
    });
  }

  ngOnInit() {
    this.loadStudentData();
  }

}
