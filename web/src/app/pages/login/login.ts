import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  credentials = {
    username: '',
    password: ''
  };

  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.errorMessage = '';

    // 注意：後端需要 userName，但我們前端模型是 username
    // 所以在這裡做一個轉換
    const loginPayload = {
      userName: this.credentials.username,
      password: this.credentials.password
    };

    this.authService.login(loginPayload).subscribe({
      next: (res) => {
        console.log('登入成功', res);
        this.router.navigate(['/users']);
      },
      error: (err) => {
        console.error('登入失敗', err);
        this.errorMessage = '登入失敗，請檢查帳號或密碼。';
      }
    });
  }
}
