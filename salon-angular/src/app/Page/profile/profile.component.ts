import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../apiServices/user.service';
import { UserServiceInfo } from '../../Service/UserService';
import { UpdateUserModel } from '../../Models/user.model';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  constructor(
    private userInfo: UserServiceInfo,
    private toastr: ToastrService
  ) {}

  isEditing: boolean = false;
  isLoading: boolean = false;
  userObj: UpdateUserModel = {
    id: null,
    name: '',
    email: '',
    phone: '',
  };
  userService = inject(UserService);

  errorMessage: string = '';

  ngOnInit(): void {
    this.userInfo.userId$.subscribe((id) => (this.userObj.id = id));
    this.userInfo.userName$.subscribe(
      (name) => (this.userObj.name = name || '')
    );
    this.userInfo.userEmail$.subscribe(
      (email) => (this.userObj.email = email || '')
    );
    this.userInfo.userPhone$.subscribe(
      (phone) => (this.userObj.phone = phone || '')
    );
  }

  submitEdit() {
    if (this.userObj.phone) {
      if (this.userObj.phone.length !== 10) {
        this.errorMessage = 'Enter correct phone number';
        return;
      }
    }
    this.isLoading = true;
    this.userService.update(this.userObj).subscribe({
      next: (res: { message: string }) => {
        this.userInfo.setUserData(this.userObj);
        this.errorMessage = '';
        this.isLoading = false;
        this.toastr.clear();
        this.toastr.success(res.message || 'Updated successfully');
        this.isEditing = false;
      },
      error: (err) => {
        this.toastr.error(err.message || 'Failed to update');
        this.isLoading = false;
      },
    });
  }
  handleClick() {
    if (this.isEditing) {
      this.submitEdit();
    } else {
      this.isEditing = true;
    }
  }
}
