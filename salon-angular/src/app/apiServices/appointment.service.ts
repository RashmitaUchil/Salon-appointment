import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppointmentModel, BookModel } from '../Models/appointment.model';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private http: HttpClient) {}

  book(obj: BookModel): Observable<{ message: string }> {
    return this.http
      .post<{ message: string }>(environment.API_URL + 'appointment/book', obj)
      .pipe(catchError(this.handleError));
  }

  dashboard(): Observable<AppointmentModel[]> {
    return this.http
      .get<AppointmentModel[]>(environment.API_URL + 'appointment/dashboard')
      .pipe(catchError(this.handleError));
  }

  appointments(id: number): Observable<AppointmentModel[]> {
    return this.http
      .get<AppointmentModel[]>(environment.API_URL + 'appointment?userId=' + id)
      .pipe(catchError(this.handleError));
  }

  update(
    appointmentId: number,
    status: boolean
  ): Observable<{ message: string; appointment: AppointmentModel }> {
    return this.http
      .put<{ message: string; appointment: AppointmentModel }>(
        environment.API_URL + 'appointment/update',
        { appointmentId, status }
      )
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<{ message: string }> {
    return this.http
      .delete<{ message: string }>(
        environment.API_URL + 'appointment?appointmentId=' + id
      )
      .pipe(catchError(this.handleError));
  }

  action(
    appointmentId: number,
    action: boolean
  ): Observable<{ message: string; appointment: AppointmentModel }> {
    return this.http
      .put<{ message: string; appointment: AppointmentModel }>(
        environment.API_URL + 'appointment/action',
        {
          appointmentId,
          action,
        }
      )
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
