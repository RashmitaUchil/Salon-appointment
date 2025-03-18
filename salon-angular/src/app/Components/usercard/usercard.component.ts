import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceInfo } from '../../Service/UserService';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-usercard',
  imports: [],
  templateUrl: './usercard.component.html',
  styleUrl: './usercard.component.css',
})
export class UsercardComponent implements OnInit {
  userName: string = '';
  constructor(
    public router: Router,
    private toastr: ToastrService,
    private userInfo: UserServiceInfo
  ) {}
  ngOnInit(): void {
    this.userInfo.userName$.subscribe((name) => {
      this.userName = name ?? 'User';
    });
  }
  handleAuth() {
    if (this.userInfo.userId$) {
      this.userInfo.clearUserData();
      this.toastr.success('Logged out');
      this.router.navigate(['home']);
    }
  }
}
