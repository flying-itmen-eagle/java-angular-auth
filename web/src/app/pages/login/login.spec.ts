import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 1. 必須引入 FormsModule 才能用 ngModel
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // 2. 這裡要註冊 FormsModule 和 CommonModule
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  
  // 3. 定義 HTML 需要的變數
  credentials = {
    username: '',
    password: ''
  };

  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  // 4. 定義 HTML 需要的方法
  onSubmit() {
    this.errorMessage = '';

    this.authService.login(this.credentials).subscribe({
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
