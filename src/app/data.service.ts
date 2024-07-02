import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { IAddForm, IAddUser, IDelete, IEditUser, IFormUser, IGetAllFormUsers, IGetAllUsers, ILogin, IResetPassword } from './interfaces';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = "https://formdatabase.azurewebsites.net"

  constructor(private http: HttpClient) { }

  GetAllForms(): Observable<IGetAllFormUsers[]> {
    return this.http.get<IGetAllFormUsers[]>(`${this.apiUrl}/Form/GetAllForms`)
      .pipe(
        catchError(this.handleError)
      );
  }

  AddForm(data: IAddForm): Observable<IAddForm> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<IAddForm>(`${this.apiUrl}/Form/AddUser`, data, httpOptions)
  }

  FilterByFirstName(): Observable<IFormUser[]> {
    return this.http.get<IFormUser[]>(`${this.apiUrl}/Form/FilterByFirstName`)
  }

  FilterByLastName(): Observable<IFormUser[]> {
    return this.http.get<IFormUser[]>(`${this.apiUrl}/Form/FilterByLastName`)
  }
  EditForm(data: IFormUser): Observable<IFormUser> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<IFormUser>(`${this.apiUrl}/Form/EditForm`, data, httpOptions)
  }
  DeleteForm(data: number): Observable<IDelete> {
    return this.http.delete<IDelete>(`${this.apiUrl}/Form/DeleteForm/${data}`)
  }


  AddUser(data: IAddUser): Observable<IAddUser> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<IAddUser>(`${this.apiUrl}/User/AddUser`, data, httpOptions)
  }

  Login(data: ILogin): Observable<ILogin> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<ILogin>(`${this.apiUrl}/User/Login`, data, httpOptions)
  }

  GetAllUsers(): Observable<IGetAllUsers[]> {
    return this.http.get<IGetAllUsers[]>(`${this.apiUrl}/User/GetAllUsers`)
  }

  ResetPassword(data: IResetPassword): Observable<IResetPassword> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<IResetPassword>(`${this.apiUrl}/User/ResetPassword`, data, httpOptions)
  }

  EditUser(data: IEditUser): Observable<IEditUser> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<IEditUser>(`${this.apiUrl}/User/EditUser`, data, httpOptions)
  }

  DeleteUser(data: number): Observable<IDelete> {
    return this.http.delete<IDelete>(`${this.apiUrl}/User/DeleteUser/${data}`)
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