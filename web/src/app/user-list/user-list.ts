import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, User } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>User Management</h2>

    <!-- 新增/修改表單 -->
    <div style="border: 1px solid #ccc; padding: 15px; margin-bottom: 20px; border-radius: 5px;">
      <h3>{{ isEditing ? 'Edit User' : 'Create New User' }}</h3>
      <div style="margin-bottom: 10px;">
        <label style="display: inline-block; width: 80px;">Username:</label>
        <input [(ngModel)]="currentUser.userName" placeholder="Username">
      </div>
      <div style="margin-bottom: 10px;">
        <label style="display: inline-block; width: 80px;">Password:</label>
        <input [(ngModel)]="currentUser.password" type="password" placeholder="Password">
      </div>
      <div style="margin-bottom: 10px;">
        <label style="display: inline-block; width: 80px;">Email:</label>
        <input [(ngModel)]="currentUser.email" placeholder="Email">
      </div>
      <button (click)="saveUser()">{{ isEditing ? 'Update' : 'Create' }}</button>
      <button (click)="resetForm()" style="margin-left: 10px;">Cancel</button>
    </div>

    <h3>User List</h3>
    <ul>
      <li *ngFor="let u of users">
        <strong>{{ u.userName }}</strong> ({{ u.email }})
        <button (click)="editUser(u)" style="margin-left: 10px;">Edit</button>
        <button (click)="deleteUser(u.id!)">Delete</button>
      </li>
    </ul>
  `
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  currentUser: User = { userName: '', password: '', email: '' };
  isEditing = false;

  constructor(private userService: UserService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.cdr.detectChanges(); // 強制觸發變更檢測，確保畫面更新
    });
  }

  saveUser() {
    if (this.isEditing && this.currentUser.id) {
      this.userService.updateUser(this.currentUser.id, this.currentUser).subscribe(() => {
        this.loadUsers();
        this.resetForm();
      });
    } else {
      this.userService.createUser(this.currentUser).subscribe(() => {
        this.loadUsers();
        this.resetForm();
      });
    }
  }

  editUser(user: User) {
    this.isEditing = true;
    this.currentUser = { ...user }; // 複製物件避免直接修改列表顯示
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }

  resetForm() {
    this.isEditing = false;
    this.currentUser = { userName: '', password: '', email: '' };
  }
}
