import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>User List</h2>
    <ul>
      <li *ngFor="let u of users">
        {{ u.userName }} ({{ u.email }})
        <button (click)="deleteUser(u.id!)">Delete</button>
      </li>
    </ul>
  `
})
export class UserListComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.ngOnInit();
    });
  }
}
