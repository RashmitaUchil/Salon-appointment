import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserServiceInfo } from '../../Service/UserService';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { UsercardComponent } from '../usercard/usercard.component';
@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule, UsercardComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  userId: number | null = null;
  private userIdSubscription!: Subscription;
  constructor(public router: Router, private userService: UserServiceInfo) {}

  ngOnInit(): void {
    this.userIdSubscription = this.userService.userId$.subscribe((id) => {
      this.userId = id;
    });
  }

  ngOnDestroy(): void {
    this.userIdSubscription.unsubscribe();
  }

  navigateToAuth() {
    const currentPath = this.router.url;
    this.router.navigate([currentPath === '/login' ? '/signup' : '/login']);
  }
}
