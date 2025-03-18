import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { SignupModel } from '../../Models/user.model';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../apiServices/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  userObj: SignupModel = {
    name: '',
    email: '',
    password: '',
    phone: '',
  };
  confirmPassword: string = '';
  userService = inject(UserService);

  onInputChange() {
    this.errorMessage = '';
  }

  errorMessage: string = '';
  loading: boolean = false;
  constructor(public router: Router, private toastr: ToastrService) {}
  onSubmit() {
    if (
      !this.userObj.name ||
      !this.userObj.email ||
      !this.userObj.password ||
      !this.confirmPassword
    ) {
      this.errorMessage = 'Fill the required fields!';
      return;
    }
    if (!/\S+@\S+\.\S+/.test(this.userObj.email)) {
      this.errorMessage = 'enter correct email';
      return;
    }
    if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        this.userObj.password
      )
    ) {
      this.errorMessage =
        'Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.';
      return;
    }

    if (this.userObj.phone) {
      if (this.userObj.phone.length !== 10) {
        this.errorMessage = 'Enter correct phone number';
        return;
      }
    }
    if (!this.validatePassword()) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }
    this.loading = true;
    this.userService.signup(this.userObj).subscribe({
      next: (res: { message: string }) => {
        this.errorMessage = '';
        this.toastr.clear();
        this.toastr.success(res.message || 'Account created successfully');
        this.loading = false;
        this.router.navigate(['login']);
      },
      error: (err) => {
        this.toastr.error(err.message || 'Failed to create');
        this.loading = false;
      },
    });
  }
  validatePassword(): boolean {
    return this.userObj.password === this.confirmPassword;
  }
}
