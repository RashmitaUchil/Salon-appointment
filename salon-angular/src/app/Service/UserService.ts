import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UpdateUserModel, UserModel } from '../Models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserServiceInfo {
  private userIdSubject = new BehaviorSubject<number | null>(
    this.getStoredUserId()
  );
  userId$ = this.userIdSubject.asObservable();

  private userNameSubject = new BehaviorSubject<string | null>(
    this.getStoredUserName()
  );
  userName$ = this.userNameSubject.asObservable();

  private userEmailSubject = new BehaviorSubject<string | null>(
    this.getStoredUserEmail()
  );
  userEmail$ = this.userEmailSubject.asObservable();

  private userPhoneSubject = new BehaviorSubject<string | null>(
    this.getStoredUserPhone()
  );
  userPhone$ = this.userPhoneSubject.asObservable();

  setUserData(user: UserModel | UpdateUserModel): void {
    this.userIdSubject.next(user.id);
    localStorage.setItem('userId', JSON.stringify(user.id));

    this.userNameSubject.next(user.name);
    localStorage.setItem('userName', user.name);
    this.userEmailSubject.next(user.email);
    localStorage.setItem('userEmail', user.email);

    this.userPhoneSubject.next(user.phone ?? '');
    localStorage.setItem('userPhone', user.phone ?? '');
  }

  //getters

  private getStoredUserId(): number {
    const storedId = localStorage.getItem('userId');
    return storedId ? JSON.parse(storedId) : null;
  }

  private getStoredUserName(): string {
    return localStorage.getItem('userName')!;
  }

  private getStoredUserEmail(): string {
    return localStorage.getItem('userEmail')!;
  }

  private getStoredUserPhone(): string | null {
    return localStorage.getItem('userPhone');
  }

  clearUserData(): void {
    this.userIdSubject.next(null);
    this.userNameSubject.next(null);
    this.userEmailSubject.next(null);
    this.userPhoneSubject.next(null);

    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPhone');
  }
}
