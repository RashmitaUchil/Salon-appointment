import {
  Component,
  inject,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceInfo } from '../../Service/UserService';
import { AppointmentService } from '../../apiServices/appointment.service';
import { AppointmentModel } from '../../Models/appointment.model';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { DxButtonModule } from 'devextreme-angular';
import { DxTabsModule } from 'devextreme-angular';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PaginatedTableComponent } from '../../Components/paginated-table/paginated-table.component';
import { AppointmentServiceInfo } from '../../Service/AppointmentService';

@Component({
  selector: 'app-show-appointments',
  imports: [
    CommonModule,
    PaginatedTableComponent,
    DxTabsModule,
    DxButtonModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './show-appointments.component.html',
  styleUrl: './show-appointments.component.css',
})
export class ShowAppointmentsComponent implements OnInit {
  appointments: AppointmentModel[] = [];
  filteredData: AppointmentModel[] = [];
  selectedTabValue: string = 'Booked';
  loading: boolean = false;
  userId: number | null = null;
  appointmentService = inject(AppointmentService);
  constructor(
    public router: Router,
    public toastr: ToastrService,
    private userInfo: UserServiceInfo,
    private appInfo: AppointmentServiceInfo
  ) {}

  errorMessage: string = '';
  ngOnInit(): void {
    this.userInfo.userId$.subscribe((id) => (this.userId = id));
    this.fetchAppointments();

    this.appInfo.appointmentChange$.subscribe(() => this.fetchAppointments());
  }

  OnAppointmentChange() {
    this.appInfo.notifyChange();
  }

  onTabChange(event: any) {
    console.log(event);

    this.selectedTabValue = event.addedItems[0].text;
    this.filteredAppointmentData();
  }

  filteredAppointmentData() {
    this.filteredData = this.appointments.filter((app) => {
      switch (this.selectedTabValue) {
        case 'Booked':
          return app.status === false && app.action === null;
        case 'Upcoming':
          return app.status === false && app.action === true;
        case 'Rejected':
          return app.status === false && app.action === false;
        case 'History':
          return app.status === true && app.action === true;
        default:
          return true;
      }
    });
  }

  fetchAppointments() {
    if (this.userId === null) {
      console.error('User ID is null. Cannot fetch appointments.');
      return;
    }
    this.loading = true;
    this.appointmentService.appointments(this.userId).subscribe({
      next: (res: AppointmentModel[]) => {
        this.errorMessage = '';
        this.appointments = res;
        this.filteredAppointmentData();
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.message || 'No Appointments';
        this.loading = false;
      },
    });
  }

  deleteAppointments(appointmentId: number) {
    Swal.fire({
      position: 'top',
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this appointment?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      background: '#F5E2D6',
      width: '350px',
    }).then((result) => {
      if (result.isConfirmed) {
        this.appointmentService.delete(appointmentId).subscribe({
          next: (res: { message: string }) => {
            console.log('id:', appointmentId);

            this.toastr.success(res.message || 'Deleted Successfully');
            this.appointments = this.appointments.filter(
              (app) => app.appointmentId !== appointmentId
            );
            this.appointments = [...this.appointments];
            this.OnAppointmentChange();
          },
          error: (err) => {
            this.toastr.error(err.message, 'Error');
          },
        });
      }
    });
  }

  confirmAppointments(appointmentId: number) {
    Swal.fire({
      position: 'top',
      title: 'Confirm Completed',
      text: 'Are you sure you want to mark this appointment as completed?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      background: '#F5E2D6',
      width: '350px',
    }).then((result) => {
      if (result.isConfirmed) {
        this.appointmentService.update(appointmentId, true).subscribe({
          next: (res) => {
            this.toastr.success(res.message || 'Confirmed Successfully');
            this.appointments = this.appointments.map((app) =>
              app.appointmentId === appointmentId
                ? { ...app, action: true, status: true }
                : app
            );
            this.OnAppointmentChange();
          },
          error: (err) => {
            this.toastr.error(err.message, 'Error');
          },
        });
      }
    });
  }

  toBook() {
    this.router.navigate(['/book']);
  }
}
