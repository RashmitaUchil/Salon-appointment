import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  LoginModel,
  UserModel,
  SignupModel,
  UpdateUserModel,
} from '../Models/user.model';
import { environment } from '../../environments/environment.development';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(obj: LoginModel): Observable<{ message: string; user: UserModel }> {
    return this.http
      .post<{ message: string; user: UserModel }>(
        environment.API_URL + 'user/login',
        obj
      )
      .pipe(catchError(this.handleError));
  }

  signup(obj: SignupModel): Observable<{ message: string }> {
    return this.http
      .post<{ message: string }>(environment.API_URL + 'user/signup', obj)
      .pipe(catchError(this.handleError));
  }

  update(obj: UpdateUserModel): Observable<{ message: string }> {
    return this.http
      .put<{ message: string }>(environment.API_URL + 'user/update', obj)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error, 'error');
    let errorMessage = 'An unknown error occurred!';
    if (error.status === 0) {
      errorMessage =
        'Unable to connect to the server. Please check your internet connection or try again later.';
    } else if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    return throwError(() => new Error(errorMessage));
  }
}
