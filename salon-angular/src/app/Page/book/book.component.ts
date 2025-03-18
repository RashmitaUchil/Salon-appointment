import { Component, inject, OnInit } from '@angular/core';
import { AppointmentService } from '../../apiServices/appointment.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserServiceInfo } from '../../Service/UserService';
import { BookModel } from '../../Models/appointment.model';

@Component({
  selector: 'app-book',
  imports: [CommonModule, FormsModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent implements OnInit {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private userInfo: UserServiceInfo
  ) {}

  userId: number | null = null;
  today: string = new Date(new Date().setDate(new Date().getDate() + 1))
    .toISOString()
    .split('T')[0];

  bookObj: BookModel = {
    userId: this.userId,
    service: '',
    appointmentDate: new Date(),
    appointmentTime: '',
    additionalNotes: '',
    status: false,
  };
  ngOnInit(): void {
    this.userInfo.userId$.subscribe((id) => {
      this.userId = id;
      this.bookObj.userId = id;
    });
    if (!this.userId) {
      this.toastr.clear();
      this.toastr.error('You need to login to book an appointment');
      this.router.navigate(['/login']);
    }
  }
  errorMessage: string = '';
  loading: boolean = false;
  appointmentService = inject(AppointmentService);

  isValidTime(time: string): boolean {
    if (!time) return false;
    const minTime = '09:00';
    const maxTime = '18:00';
    return time >= minTime && time <= maxTime;
  }
  onInputChange() {
    this.errorMessage = '';
  }

  onSubmit() {
    console.log('book clicked');

    if (
      !this.bookObj.service ||
      !this.bookObj.appointmentDate ||
      !this.bookObj.appointmentTime
    ) {
      this.errorMessage = 'Fill all the neccessary fields';
      return;
    }
    if (!this.isValidTime(this.bookObj.appointmentTime)) {
      this.errorMessage = 'Time must be between 9:00 am to 6:00 pm';
      return;
    }
    this.loading = true;
    this.appointmentService.book(this.bookObj).subscribe({
      next: (res: { message: string }) => {
        this.errorMessage = '';
        this.toastr.clear();
        this.toastr.success(res.message || 'Booking successful');
        this.loading = false;
        this.router.navigate(['home']);
      },
      error: (err) => {
        this.toastr.error(err.message || 'Failed to book');
        this.loading = false;
      },
    });
  }
}
