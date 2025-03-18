import {
  Component,
  input,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular';
import { AppointmentModel } from '../../Models/appointment.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DxButtonModule } from 'devextreme-angular';

@Component({
  selector: 'app-paginated-table',
  imports: [DxDataGridModule, CommonModule, DxButtonModule],
  templateUrl: './paginated-table.component.html',
  styleUrl: './paginated-table.component.css',
})
export class PaginatedTableComponent {
  constructor(public router: Router) {}
  @Input() appointments: AppointmentModel[] = [];
  @Input() accept!: (id: number) => void;
  @Input() reject!: (id: number) => void;
  @Input() selectedTab!: string;

  today = new Date();

  validateFutureDate(params: any): boolean {
    if (!params.value) return false;
    const selectedDate = new Date(params.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return selectedDate > today;
  }

  formatNotes(data: any) {
    return data.additionalNotes ? data.additionalNotes : 'No Notes';
  }
}
