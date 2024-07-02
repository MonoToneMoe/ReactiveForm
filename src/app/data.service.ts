import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { IAddUser, IGetAllUsers, Student } from './interfaces';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = "https://formassignmentbackend.azurewebsites.net"

  constructor(private http: HttpClient) { }

  getStudentData() {
    let data = this.http.get<Student[]>(`https://formdatabase.azurewebsites.net/Form/GetAllForms`);
    console.log(data)
    return data;
  }

  getAllUsers(): Observable<IGetAllUsers[]> {
    return this.http.get<IGetAllUsers[]>(`${this.apiUrl}/User/GetAllUsers`)
    .pipe(
      catchError(this.handleError)
    );
  }
  
  AddUser(data: IAddUser): Observable<IAddUser> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<IAddUser>(`${this.apiUrl}/User/AddUser`, data, httpOptions)
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('An error occurred:', error.error.message);
    } else {
      // Backend returned an unsuccessful response code
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`); // Log the error body as JSON
    }
    // Return an observable with a user-facing error message
    return throwError('Error: Backend returned HTML instead of JSON.');
  }
}