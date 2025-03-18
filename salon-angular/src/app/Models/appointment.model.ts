export interface AppointmentModel {
  appointmentId: number;
  userId: {
    name: string;
    email: string;
    phone: string;
  };
  service: string;
  date: string;
  time: string;
  additionalNotes: string;
  status: boolean;
  action: boolean;
}

export interface BookModel {
  userId: number | null;
  service: string;
  appointmentDate: Date;
  appointmentTime: string;
  additionalNotes: string;
  status: boolean;
}
