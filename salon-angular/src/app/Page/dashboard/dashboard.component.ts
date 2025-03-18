import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AppointmentModel } from '../../Models/appointment.model';
import { AppointmentService } from '../../apiServices/appointment.service';
import Swal from 'sweetalert2';
import { PaginatedTableComponent } from '../../Components/paginated-table/paginated-table.component';
import { DxButtonModule } from 'devextreme-angular';
import { DxTabsModule } from 'devextreme-angular';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AppointmentServiceInfo } from '../../Service/AppointmentService';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    PaginatedTableComponent,
    DxButtonModule,
    DxTabsModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor(
    public toastr: ToastrService,
    private appInfo: AppointmentServiceInfo
  ) {}
  selectedTabValue: string = 'Booked';

  appointments: AppointmentModel[] = [];
  loading: boolean = false;
  appointmentService = inject(AppointmentService);
  filteredData: AppointmentModel[] = [];
  errorMessage: string = '';
  ngOnInit(): void {
    this.fetchAppointments();
    this.appInfo.appointmentChange$.subscribe(() => this.fetchAppointments());
  }

  OnAppointmentChange() {
    this.appInfo.notifyChange();
  }

  onTabChange(event: any) {
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
        case 'History':
          return app.status === true && app.action === true;
        default:
          return true;
      }
    });
  }

  fetchAppointments() {
    this.loading = true;
    this.appointmentService.dashboard().subscribe({
      next: (res: AppointmentModel[]) => {
        this.errorMessage = '';
        this.appointments = res;
        this.filteredAppointmentData();
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.message || 'No appointments';
      },
    });
  }

  rejectAppointment(appointmentId: number) {
    Swal.fire({
      position: 'top',
      title: 'Confirm Deletion',
      text: 'Are you sure you want to reject this appointment?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      background: '#F5E2D6',
      width: '350px',
    }).then((result) => {
      if (result.isConfirmed) {
        this.appointmentService.action(appointmentId, false).subscribe({
          next: (res) => {
            this.toastr.success(res.message || 'rejected successfully');
            this.appointments = [
              ...this.appointments.filter(
                (app) => app.appointmentId !== appointmentId
              ),
            ];
            this.OnAppointmentChange();
          },
          error: (err) => {
            this.toastr.error(err.message || 'failed to reject');
          },
        });
      }
    });
  }

  acceptAppointment(appointmentId: number) {
    Swal.fire({
      position: 'top',
      title: 'Confirm Acceptance',
      text: 'Are you sure you want to accept this appointment?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      background: '#F5E2D6',
      width: '350px',
    }).then((result) => {
      if (result.isConfirmed) {
        this.appointmentService.action(appointmentId, true).subscribe({
          next: (res) => {
            this.toastr.success(res.message || 'accepted successfully');
            this.appointments = this.appointments.map((app) =>
              app.appointmentId === appointmentId
                ? { ...app, ...res.appointment }
                : app
            );
            this.OnAppointmentChange();
          },
          error: (err) => {
            this.toastr.error(err.message || 'failed to reject');
          },
        });
      }
    });
  }
}
