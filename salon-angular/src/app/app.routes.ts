import { Routes } from '@angular/router';
import { AboutComponent } from './Page/about/about.component';
import { HomeComponent } from './Page/home/home.component';
import { DashboardComponent } from './Page/dashboard/dashboard.component';
import { BookComponent } from './Page/book/book.component';
import { ServicesComponent } from './Page/services/services.component';
import { LoginComponent } from './Page/login/login.component';
import { SignupComponent } from './Page/signup/signup.component';
import { ShowAppointmentsComponent } from './Page/show-appointments/show-appointments.component';
import { ProfileComponent } from './Page/profile/profile.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'book', component: BookComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'app', component: ShowAppointmentsComponent },
  { path: 'service/:name', component: ServicesComponent },
  { path: 'profile', component: ProfileComponent },
];
