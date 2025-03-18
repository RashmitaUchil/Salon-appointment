import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentServiceInfo {
  private appointmentChangeSubject = new BehaviorSubject<void>(undefined);
  appointmentChange$ = this.appointmentChangeSubject.asObservable();

  notifyChange() {
    this.appointmentChangeSubject.next();
  }
}
