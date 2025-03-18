import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { LoginModel, UserModel } from '../../Models/user.model';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../apiServices/user.service';
import { UserServiceInfo } from '../../Service/UserService';
@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  userObj: LoginModel = {
    email: '',
    password: '',
  };

  userService = inject(UserService);
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    public router: Router,
    private toastr: ToastrService,
    private userInfo: UserServiceInfo
  ) {}

  onInputChange() {
    this.errorMessage = '';
  }
  onSubmit() {
    if (!this.userObj.email || !this.userObj.password) {
      this.errorMessage = 'Fill all the fields';
      return;
    }

    this.loading = true;
    this.userService.login(this.userObj).subscribe({
      next: ({ message, user }) => {
        if (!user) {
          console.error('User object is missing in response');
          this.toastr.error('Invalid response from server');
          return;
        }
        this.errorMessage = '';
        this.toastr.clear();
        this.toastr.success(message || 'Logged in');
        this.loading = false;
        this.userInfo.setUserData(user);

        this.userInfo.userName$.subscribe((name) =>
          console.log('User name:', name)
        );
        this.userInfo.userEmail$.subscribe((email) =>
          console.log('User email:', email)
        );
        this.userInfo.userPhone$.subscribe((phone) =>
          console.log('User phone:', phone)
        );
        this.router.navigate(['home']);
      },
      error: (err) => {
        this.toastr.error(err.message);

        this.loading = false;
      },
    });
  }
}
