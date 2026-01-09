import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // 假設你的 Spring Boot 登入 API 路徑
  private loginUrl = 'http://localhost:8080/auth/login'; 
  private tokenKey = 'auth_token'; // 在 LocalStorage 儲存的 key 名稱

  constructor(private http: HttpClient) { }

  // 登入方法
  login(credentials: any): Observable<any> {
    return this.http.post<any>(this.loginUrl, credentials).pipe(
      tap(response => {
        // 假設後端回傳的 JSON 格式是 { "token": "eyJhbG..." }
        // 請根據你實際 Spring Boot 回傳的欄位名稱修改這裡
        if (response && response.jwt) {
          localStorage.setItem(this.tokenKey, response.jwt);
        }
      })
    );
  }

  // 取得 Token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // 判斷是否已登入
  isLoggedIn(): boolean {
    const token = this.getToken();
    // 這裡可以加更嚴謹的判斷 (例如檢查 Token 是否過期)
    // 目前先簡單判斷是否有 Token
    return !!token;
  }

  // 登出
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    // 登出後通常會導回登入頁，這部分在 Component 處理
  }
}
