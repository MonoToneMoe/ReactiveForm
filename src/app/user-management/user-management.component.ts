import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule, NgFor } from '@angular/common';
import { DataService } from '../data.service';
import { Student } from '../interfaces';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [NgFor, CommonModule, NavbarComponent],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {

  dataService = inject(DataService);
  studentList: Student[] | null = null;
  modelOpen: boolean = false


  loadStudentData() {
    this.dataService.getStudentData().subscribe((data) => {
      // console.log(list);
      this.studentList = data;
      console.log(this.studentList)
    });
  }

  handleDeleteStudent( id:number) {

  }

  handleEditUser( id:number) {
    this.modelOpen = true;
  }

  handleCloseModal() {
    this.modelOpen = false;
  }

  ngOnInit() {
    this.loadStudentData();
  }

}
